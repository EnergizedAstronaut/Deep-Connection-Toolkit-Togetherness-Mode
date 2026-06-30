# 🚂 Deploying Connection Toolkit to Railway

This is a pure client-side Next.js app — no API keys, no database. I built and
ran it in a sandbox before handing it back (`npm run build`, then `npm start`
with `PORT` set, confirmed HTTP 200) so this should deploy clean on the first try.

One thing already fixed proactively based on the issue we hit on the other
project: `tailwindcss`, `postcss`, and `autoprefixer` are listed under regular
`dependencies` here (not `devDependencies`). Some platforms run `npm ci` in a
production mode that skips devDependencies, which would silently strip all
styling. Keeping them in `dependencies` avoids that.

## Deploy via GitHub (recommended)

```bash
cd connection-toolkit
git init
git add .
git commit -m "Initial release: Connection Toolkit (Next.js)"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/connection-toolkit.git
git push -u origin main
```

Then:
1. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
2. Pick the repo. Railway/Railpack auto-detects Next.js — no settings needed.
3. Once deployed: service → **Settings → Networking → Generate Domain**.
   You won't get a public URL until you click this.
4. That domain is your live link, e.g. `https://connection-toolkit.up.railway.app`.

## Deploy via Railway CLI

```bash
npm install -g @railway/cli
railway login
cd connection-toolkit
railway init
railway up
railway domain
```

## If it doesn't come up clean

- **404 "This page could not be found"** → almost always means `page.jsx` isn't
  at `app/page.jsx`, or `layout.jsx` imports a CSS file name that doesn't match
  what's actually in the repo (this bit us on the other project — double-check
  the import is exactly `./globals.css` and the file is named `globals.css`,
  not `global.css`).
- **Page loads but completely unstyled** → Tailwind didn't run. Confirm
  `tailwind.config.js` is present and its `content` paths match your folders.
- **"Module not found: Can't resolve '@/components/...'"** → `jsconfig.json` is
  missing from the repo root.
