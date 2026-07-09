import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  }),
);

let questions = [];
let subscriptions = [];
let nextQuestionId = 1;
let nextAnswerId = 1;

const filterQuestions = (query) => {
  if (!query) return questions;
  const normalized = query.toLowerCase();
  return questions.filter((q) => {
    const title = q.title?.toLowerCase() ?? '';
    const body = q.body?.toLowerCase() ?? '';
    const subject = q.subject?.toLowerCase() ?? '';
    return (
      title.includes(normalized) ||
      body.includes(normalized) ||
      subject.includes(normalized)
    );
  });
};

// ─── Health ────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ─── Questions ─────────────────────────────────────────────────────────────
app.get('/api/questions', (req, res) => {
  const { q } = req.query;
  const results = filterQuestions(q);
  res.json(results);
});

app.post('/api/questions', (req, res) => {
  const { title, body, subject } = req.body || {};

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required.' });
  }

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
  const { id } = req.params;
  const { delta } = req.body || {};

  const question = questions.find((q) => q.id === id);
  if (!question) {
    return res.status(404).json({ error: 'Question not found.' });
  }

  const change = Number.isFinite(delta) ? delta : Number(delta) || 0;
  question.votes = Math.max(0, question.votes + change);

  return res.json(question);
});

// ─── Answers ───────────────────────────────────────────────────────────────
app.get('/api/questions/:id/answers', (req, res) => {
  const { id } = req.params;
  const question = questions.find((q) => q.id === id);
  if (!question) {
    return res.status(404).json({ error: 'Question not found.' });
  }
  return res.json(question.answers || []);
});

app.post('/api/questions/:id/answers', (req, res) => {
  const { id } = req.params;
  const { body, author } = req.body || {};

  if (!body || !body.trim()) {
    return res.status(400).json({ error: 'Answer body is required.' });
  }

  const question = questions.find((q) => q.id === id);
  if (!question) {
    return res.status(404).json({ error: 'Question not found.' });
  }

  const answer = {
    id: String(nextAnswerId++),
    body: body.trim(),
    author: author?.trim() || 'Anonymous',
    votes: 0,
    createdAt: new Date().toISOString(),
  };

  if (!question.answers) question.answers = [];
  question.answers.push(answer);

  return res.status(201).json({ question, answer });
});

app.post('/api/questions/:id/answers/:answerId/vote', (req, res) => {
  const { id, answerId } = req.params;
  const { delta } = req.body || {};

  const question = questions.find((q) => q.id === id);
  if (!question) return res.status(404).json({ error: 'Question not found.' });

  const answer = (question.answers || []).find((a) => a.id === answerId);
  if (!answer) return res.status(404).json({ error: 'Answer not found.' });

  const change = Number.isFinite(delta) ? delta : Number(delta) || 0;
  answer.votes = Math.max(0, answer.votes + change);

  return res.json(answer);
});

// ─── Subscriptions ─────────────────────────────────────────────────────────
app.post('/api/subscriptions', (req, res) => {
  const { email } = req.body || {};

  if (
    !email ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email).toLowerCase())
  ) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  const normalizedEmail = String(email).toLowerCase();
  const alreadySubscribed = subscriptions.some((s) => s.email === normalizedEmail);

  if (alreadySubscribed) {
    return res.status(200).json({ message: 'You are already subscribed.' });
  }

  subscriptions.push({
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  });

  return res.status(201).json({ message: 'Subscribed successfully!' });
});

// ─── 404 ───────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`✅  API server listening on http://localhost:${PORT}`);
});
