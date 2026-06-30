# 💭 Connection Toolkit

Intentional questions for deeper relationships — Next.js / React edition.

This is the Railway-ready version of Connection Toolkit. It ships with the full
cleaned 268-question bank (no religious content, no answers — just prompts),
auto-split across three levels by difficulty:

| Level            | Source tier(s)      | Questions available | Session size |
|------------------|----------------------|----------------------|---------------|
| ☕ First Date     | easy                 | 35                   | 8             |
| 🌟 Third Date     | medium                | 161                 | 8             |
| ❤️ Deep Connection| hard + very hard      | 72                  | 6             |

Each session pulls a random subset so repeat plays don't feel identical.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deploying to Railway

See `RAILWAY_DEPLOY.md`.

## Project structure

```
connection-toolkit/
├── app/
│   ├── page.jsx
│   ├── layout.jsx
│   └── globals.css
├── components/
│   ├── ConnectionToolkit.jsx   # the app
│   └── questionBank.js         # the 268-question dataset, tiered
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── jsconfig.json
```

## Editing the question bank

`components/questionBank.js` is a plain JS object exported as default:

```js
const QUESTIONS = {
  "first-date": { category: "First Date", icon: "☕", questions: [ { theme, text }, ... ] },
  "third-date": { ... },
  "deep-bond":  { ... },
};
```

Add, remove, or move questions directly in this file — no build step required
beyond the normal `npm run build`.
