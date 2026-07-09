# VITyalay — Learning Beyond Classrooms

A collaborative Q&A platform for VIT students and faculty. Students post academic queries, faculty answer them, and the community votes on the best responses.

## 🚀 Live Demo

**[https://vityalay.vercel.app](https://vityalay.vercel.app)**

---

## ✨ Features

- **Question Bank** — Post, browse, search, and filter academic questions
- **Answers** — Faculty and students can reply directly on each question
- **Voting** — Upvote questions to surface the most important ones
- **Subject Filter** — Browse questions by subject (Python, DBMS, Calculus, etc.)
- **Newsletter** — Subscribe for platform updates
- **Responsive** — Works on desktop, tablet, and mobile

---

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, Vite, React Router v7     |
| UI        | Reactstrap, Bootstrap 5, Remixicon  |
| Carousel  | react-slick                         |
| Backend   | Express 5 (Node.js)                 |
| Hosting   | Vercel (frontend + serverless API)  |

---

## 📁 Project Structure

```
VITyalay/
├── api/
│   └── index.js          # Vercel serverless API (all /api/* routes)
├── public/
│   ├── index.html
│   └── src/
│       ├── api.js                # Frontend API client
│       ├── App.jsx
│       ├── components/
│       │   ├── Header/
│       │   ├── Hero-Section/
│       │   ├── Courses-section/
│       │   ├── Offer/
│       │   ├── About-us/
│       │   ├── GetUpdates/
│       │   ├── Company-section/
│       │   └── Footer/
│       └── pages/
│           ├── Home.jsx
│           └── Questions.jsx
├── server/
│   └── index.js          # Local dev Express server
├── vercel.json           # Vercel deployment config
└── vite.config.js
```

---

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Run frontend + backend together
npm run dev:full

# Or run separately:
npm run dev       # Vite frontend on http://localhost:5173
npm run server    # Express API on http://localhost:5000
```

---

## 🚢 Deploying to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --yes
```

> **Note:** The API uses in-memory storage — data resets on cold starts.  
> For persistent data, connect a database (Vercel KV, Supabase, or MongoDB Atlas).

---

## 📄 API Endpoints

| Method | Endpoint                                    | Description            |
|--------|---------------------------------------------|------------------------|
| GET    | `/api/questions`                            | List / search questions |
| POST   | `/api/questions`                            | Create a question      |
| POST   | `/api/questions/:id/vote`                   | Upvote a question      |
| GET    | `/api/questions/:id/answers`               | Get answers            |
| POST   | `/api/questions/:id/answers`               | Post an answer         |
| POST   | `/api/questions/:id/answers/:aid/vote`     | Upvote an answer       |
| POST   | `/api/subscriptions`                        | Subscribe to newsletter |

---

## 👤 Author

**Raghwendra Singh**  
[LinkedIn](https://www.linkedin.com/in/raghwendra-singh-62aab3288/) · [Twitter](https://x.com/Raghwendra531) · [Instagram](https://www.instagram.com/raghwendrasingh_531/)
