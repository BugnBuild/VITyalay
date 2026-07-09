// Vercel Serverless Function — handles all /api/* routes
// This wraps the Express app so existing frontend API calls work unchanged.
//
// ⚠️  In-memory storage only: data resets on each cold start.
//     For production persistence, replace with Vercel KV / Supabase / MongoDB Atlas.

import express from 'express';

const app = express();
app.use(express.json());

// ─── In-memory store ───────────────────────────────────────────────────────
let questions = [];
let subscriptions = [];
let nextQuestionId = 1;
let nextAnswerId = 1;

const filterQuestions = (query) => {
  if (!query) return questions;
  const n = query.toLowerCase();
  return questions.filter(
    (q) =>
      q.title?.toLowerCase().includes(n) ||
      q.body?.toLowerCase().includes(n) ||
      q.subject?.toLowerCase().includes(n),
  );
};

// ─── Health ────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ─── Questions ─────────────────────────────────────────────────────────────
app.get('/api/questions', (req, res) => {
  res.json(filterQuestions(req.query.q));
});

app.post('/api/questions', (req, res) => {
  const { title, body, subject } = req.body || {};
  if (!title || !body)
    return res.status(400).json({ error: 'Title and body are required.' });

  const question = {
    id: String(nextQuestionId++),
    title: title.trim(),
    body: body.trim(),
    subject: subject?.trim() || '',
    votes: 0,
    answers: [],
    createdAt: new Date().toISOString(),
  };
  questions.unshift(question);
  return res.status(201).json(question);
});

app.post('/api/questions/:id/vote', (req, res) => {
  const q = questions.find((q) => q.id === req.params.id);
  if (!q) return res.status(404).json({ error: 'Question not found.' });
  const delta = Number(req.body?.delta) || 1;
  q.votes = Math.max(0, q.votes + delta);
  return res.json(q);
});

// ─── Answers ───────────────────────────────────────────────────────────────
app.get('/api/questions/:id/answers', (req, res) => {
  const q = questions.find((q) => q.id === req.params.id);
  if (!q) return res.status(404).json({ error: 'Question not found.' });
  return res.json(q.answers || []);
});

app.post('/api/questions/:id/answers', (req, res) => {
  const q = questions.find((q) => q.id === req.params.id);
  if (!q) return res.status(404).json({ error: 'Question not found.' });

  const { body, author } = req.body || {};
  if (!body?.trim()) return res.status(400).json({ error: 'Answer body is required.' });

  const answer = {
    id: String(nextAnswerId++),
    body: body.trim(),
    author: author?.trim() || 'Anonymous',
    votes: 0,
    createdAt: new Date().toISOString(),
  };
  if (!q.answers) q.answers = [];
  q.answers.push(answer);
  return res.status(201).json({ question: q, answer });
});

app.post('/api/questions/:id/answers/:answerId/vote', (req, res) => {
  const q = questions.find((q) => q.id === req.params.id);
  if (!q) return res.status(404).json({ error: 'Question not found.' });
  const answer = (q.answers || []).find((a) => a.id === req.params.answerId);
  if (!answer) return res.status(404).json({ error: 'Answer not found.' });
  const delta = Number(req.body?.delta) || 1;
  answer.votes = Math.max(0, answer.votes + delta);
  return res.json(answer);
});

// ─── Subscriptions ─────────────────────────────────────────────────────────
app.post('/api/subscriptions', (req, res) => {
  const { email } = req.body || {};
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email).toLowerCase()))
    return res.status(400).json({ error: 'A valid email address is required.' });

  const normalized = String(email).toLowerCase();
  if (subscriptions.some((s) => s.email === normalized))
    return res.status(200).json({ message: 'You are already subscribed.' });

  subscriptions.push({ email: normalized, createdAt: new Date().toISOString() });
  return res.status(201).json({ message: 'Subscribed successfully!' });
});

// ─── 404 ───────────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

export default app;
