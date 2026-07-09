const API_BASE = '/api';

const jsonHeaders = {
  'Content-Type': 'application/json',
};

async function handleResponse(response) {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message =
      payload?.error ||
      payload?.message ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

// ─── Questions ─────────────────────────────────────────────────────────────

export async function getQuestions(query) {
  const params = query ? `?q=${encodeURIComponent(query)}` : '';
  const response = await fetch(`${API_BASE}/questions${params}`);
  return handleResponse(response);
}

export async function createQuestion({ title, body, subject }) {
  const response = await fetch(`${API_BASE}/questions`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ title, body, subject }),
  });
  return handleResponse(response);
}

export async function voteQuestion(id, delta = 1) {
  const response = await fetch(`${API_BASE}/questions/${id}/vote`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ delta }),
  });
  return handleResponse(response);
}

// ─── Answers ───────────────────────────────────────────────────────────────

export async function getAnswers(questionId) {
  const response = await fetch(`${API_BASE}/questions/${questionId}/answers`);
  return handleResponse(response);
}

export async function createAnswer(questionId, { body, author }) {
  const response = await fetch(`${API_BASE}/questions/${questionId}/answers`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ body, author }),
  });
  return handleResponse(response);
}

export async function voteAnswer(questionId, answerId, delta = 1) {
  const response = await fetch(
    `${API_BASE}/questions/${questionId}/answers/${answerId}/vote`,
    {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify({ delta }),
    },
  );
  return handleResponse(response);
}

// ─── Subscriptions ─────────────────────────────────────────────────────────

export async function subscribeToUpdates(email) {
  const response = await fetch(`${API_BASE}/subscriptions`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
}
