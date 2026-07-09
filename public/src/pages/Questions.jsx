import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useSearchParams } from 'react-router-dom';
import { getQuestions, createQuestion, voteQuestion, createAnswer, voteAnswer } from '../api';
import './questions.css';

const initialForm = { subject: '', title: '', body: '' };

// ── Single Question Card ──────────────────────────────────────────────────
const QuestionCard = ({ question, onVote, onAnswerAdded }) => {
  const [expanded, setExpanded] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [posting, setPosting] = useState(false);
  const [answerError, setAnswerError] = useState('');
  const [voted, setVoted] = useState(false);

  const handleVote = (e) => {
    e.stopPropagation();
    if (voted) return;
    setVoted(true);
    onVote(question.id);
  };

  const handleToggle = () => setExpanded((prev) => !prev);

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!answerText.trim()) {
      setAnswerError('Please write an answer.');
      return;
    }
    try {
      setPosting(true);
      setAnswerError('');
      const { question: updated } = await createAnswer(question.id, {
        body: answerText.trim(),
        author: authorName.trim() || 'Anonymous',
      });
      onAnswerAdded(updated);
      setAnswerText('');
      setAuthorName('');
    } catch (err) {
      setAnswerError(err.message || 'Could not post answer.');
    } finally {
      setPosting(false);
    }
  };

  const answers = question.answers || [];
  const timeAgo = (iso) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className={`question_card${expanded ? ' expanded' : ''}`}>
      <div onClick={handleToggle}>
        <div className="q_card_header">
          <h5 className="q_card_title">{question.title}</h5>
          <button
            className={`vote_btn${voted ? ' voted' : ''}`}
            onClick={handleVote}
            title={voted ? 'Already voted' : 'Upvote this question'}
          >
            ▲ {question.votes ?? 0}
          </button>
        </div>

        <p className="q_card_body">
          {expanded
            ? question.body
            : question.body.length > 120
            ? `${question.body.slice(0, 120)}…`
            : question.body}
        </p>

        <div className="q_card_meta">
          {question.subject && (
            <span className="subject_badge">{question.subject}</span>
          )}
          <span className="q_meta_text">
            <i className="ri-time-line" style={{ fontSize: '0.8rem', marginRight: 4 }} />
            {timeAgo(question.createdAt)}
          </span>
          <span className="q_meta_text">
            <i className="ri-question-answer-line" style={{ fontSize: '0.8rem', marginRight: 4 }} />
            {answers.length} answer{answers.length !== 1 ? 's' : ''}
          </span>
          <span className="q_meta_text" style={{ marginLeft: 'auto', color: '#6c47ff', fontWeight: 600, fontSize: '0.8rem' }}>
            {expanded ? '▲ Collapse' : '▼ View & Answer'}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="answers_section">
          <div className="answers_title">
            <i className="ri-question-answer-line" />
            {answers.length > 0 ? `${answers.length} Answer${answers.length !== 1 ? 's' : ''}` : 'No answers yet — be the first!'}
          </div>

          {answers.map((a) => (
            <div key={a.id} className="answer_item">
              <p>{a.body}</p>
              <div className="answer_meta">
                <strong>{a.author}</strong> · {timeAgo(a.createdAt)}
              </div>
            </div>
          ))}

          <form className="add_answer_form" onSubmit={handlePostAnswer}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="form_input_custom"
                style={{ minHeight: 'unset', padding: '8px 14px' }}
              />
              <textarea
                placeholder="Write your answer here…"
                value={answerText}
                onChange={(e) => { setAnswerText(e.target.value); setAnswerError(''); }}
              />
              {answerError && <p className="alert_custom" style={{ margin: 0 }}>{answerError}</p>}
            </div>
            <button type="submit" className="btn-answer" disabled={posting}>
              {posting ? 'Posting…' : 'Post Answer'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// ── Main Questions Page ───────────────────────────────────────────────────
const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [searchParams] = useSearchParams();

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getQuestions();
      setQuestions(data);
    } catch (err) {
      setError(err.message || 'Unable to load questions right now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
    // Pre-fill subject from URL param (from course cards)
    const subjectParam = searchParams.get('subject');
    if (subjectParam) setFilterSubject(subjectParam);
  }, [loadQuestions, searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) {
      setError('Please fill in both the Title and Body fields.');
      return;
    }
    try {
      setSubmitting(true);
      setError('');
      const created = await createQuestion({
        title: form.title.trim(),
        body: form.body.trim(),
        subject: form.subject.trim(),
      });
      setQuestions((prev) => [created, ...prev]);
      setForm(initialForm);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (err) {
      setError(err.message || 'Unable to submit your question right now.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (id) => {
    try {
      const updated = await voteQuestion(id, 1);
      setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
    } catch {
      // silently fail
    }
  };

  const handleAnswerAdded = (updatedQuestion) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)),
    );
  };

  // Filter and sort
  const allSubjects = [...new Set(questions.map((q) => q.subject).filter(Boolean))];

  const filtered = questions
    .filter((q) => {
      const text = filterText.toLowerCase();
      const matchText =
        !text ||
        q.title.toLowerCase().includes(text) ||
        q.body.toLowerCase().includes(text) ||
        q.subject.toLowerCase().includes(text);
      const matchSubject = !filterSubject || q.subject === filterSubject;
      return matchText && matchSubject;
    })
    .sort((a, b) => {
      if (sortBy === 'votes') return (b.votes ?? 0) - (a.votes ?? 0);
      if (sortBy === 'answers') return (b.answers?.length ?? 0) - (a.answers?.length ?? 0);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <>
      {/* Page Header */}
      <div className="qpage_header">
        <Container>
          <h1>Question Bank 💬</h1>
          <p>Post academic questions and browse what others are asking. Get answers from faculty.</p>
        </Container>
      </div>

      {/* Main Layout */}
      <div className="questions_layout">
        <Container>
          <Row className="g-4">
            {/* Left: Form */}
            <Col lg="5" md="12">
              <div className="ask_form_card">
                <h4>✏️ Ask a Question</h4>

                {submitSuccess && (
                  <div className="alert_custom alert_success">
                    🎉 Your question was posted successfully!
                  </div>
                )}
                {error && !submitSuccess && (
                  <div className="alert_custom">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form_label_custom" htmlFor="subject">
                      Subject / Course
                      <span style={{ color: '#9ca3af', fontWeight: 400 }}> (optional)</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      className="form_input_custom"
                      placeholder="e.g. Calculus, DBMS, Python"
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form_label_custom" htmlFor="title">
                      Title <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="form_input_custom"
                      maxLength={80}
                      placeholder="Summarize your problem in one line"
                      value={form.title}
                      onChange={handleChange}
                      required
                    />
                    <div className="char_count">{form.title.length}/80</div>
                  </div>

                  <div className="mb-4">
                    <label className="form_label_custom" htmlFor="body">
                      Body <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <textarea
                      id="body"
                      name="body"
                      className="form_input_custom"
                      rows={5}
                      placeholder="Include all details — what you tried, what you expected, and what happened."
                      value={form.body}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-post" disabled={submitting}>
                    {submitting ? 'Posting…' : '🚀 Post Question'}
                  </button>
                </form>
              </div>

              {/* Tips */}
              <div className="tips_card mt-4">
                <h5>💡 Tips for a great question</h5>
                <ul>
                  <li><span className="tip_icon">✓</span> Summarize the problem clearly in the title</li>
                  <li><span className="tip_icon">✓</span> Explain what you tried and what you expected</li>
                  <li><span className="tip_icon">✓</span> Include formulas, code, or steps if relevant</li>
                  <li><span className="tip_icon">✓</span> Mention the subject or course for faster answers</li>
                  <li><span className="tip_icon">✓</span> Keep it specific — focused questions get faster answers</li>
                </ul>
              </div>
            </Col>

            {/* Right: Q&A Feed */}
            <Col lg="7" md="12">
              {/* Toolbar */}
              <div className="questions_toolbar">
                <div className="q_search_bar">
                  <i className="ri-search-line" />
                  <input
                    type="text"
                    placeholder="Search questions…"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </div>
                {allSubjects.length > 0 && (
                  <select
                    className="filter_select"
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {allSubjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                )}
                <select
                  className="filter_select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="votes">Most Votes</option>
                  <option value="answers">Most Answered</option>
                </select>
              </div>

              {/* Count */}
              {!loading && (
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: 16 }}>
                  {filtered.length} question{filtered.length !== 1 ? 's' : ''}
                  {filterText || filterSubject ? ' matching your filters' : ' total'}
                </p>
              )}

              {/* Loading */}
              {loading && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 12 }}>⏳</div>
                  <p>Loading questions…</p>
                </div>
              )}

              {/* Empty State */}
              {!loading && filtered.length === 0 && (
                <div className="empty_state">
                  <span className="empty_icon">🤔</span>
                  <h4>
                    {filterText || filterSubject
                      ? 'No questions match your filters'
                      : 'No questions yet'}
                  </h4>
                  <p>
                    {filterText || filterSubject
                      ? 'Try adjusting your search or filter.'
                      : 'Be the first to ask something! Use the form on the left.'}
                  </p>
                </div>
              )}

              {/* Questions */}
              <div className="d-flex flex-column gap-3">
                {filtered.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    onVote={handleVote}
                    onAnswerAdded={handleAnswerAdded}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Questions;
