# 🚂 Deploying Deep Connection Toolkit to Railway

Good news: this is a 100% client-side Next.js app — no API keys, no database, no
backend calls. Railway can build and run it with zero special configuration.

I tested the build in a sandbox before handing this back, and fixed two bugs that
would have broken it on Railway (or anywhere):

1. `layout.jsx` imported `./globals.css`, but the uploaded file was named
   `global.css` (missing the "s"). Fixed by renaming + placing it at `app/globals.css`.
2. `page.jsx` imports `@/components/DeepConnectionToolkit`, but there was no
   `jsconfig.json` defining that `@/` path alias — added one.
3. The component uses `useState`/`useEffect` but had no `"use client"` directive,
   which the App Router requires. Added it.
4. `tailwind.config.js` / `postcss.config.js` were missing, so Tailwind had nothing
   telling it which files to scan — added both.

With those fixes, `npm install && npm run build && npm start` works clean, and
`next start` correctly binds to Railway's `PORT` env var automatically — no extra
config needed there.

---

## Option A — Deploy via GitHub (recommended)

1. Push this folder to a new GitHub repo:
   ```bash
   cd deep-connection-toolkit
   git init
   git add .
   git commit -m "Initial release: Deep Connection Toolkit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/deep-connection-toolkit.git
   git push -u origin main
   ```
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
3. Select the `deep-connection-toolkit` repo. Railway's Nixpacks builder auto-detects
   Next.js and runs `npm install`, `npm run build`, `npm start` — no settings to touch.
4. Once it deploys, go to the service → **Settings → Networking → Generate Domain**.
   This is the step people most often miss — Railway doesn't expose a public URL
   until you click this. You'll get something like:
   ```
   https://deep-connection-toolkit.up.railway.app
   ```
5. That's your live link. Future `git push` to `main` auto-redeploys.

## Option B — Deploy via Railway CLI (no GitHub needed)

```bash
npm install -g @railway/cli
railway login
cd deep-connection-toolkit
railway init
railway up
railway domain   # generates and prints your public URL
```

---

## If something doesn't deploy cleanly

- **"Module not found: Can't resolve '@/components/...'"** → `jsconfig.json` is missing
  or wasn't included in the push. Confirm it's at the project root, not inside `app/`.
- **Styles look unstyled / no gradients** → Tailwind didn't pick up the classes.
  Confirm `tailwind.config.js` content paths match where your files actually live.
- **Build error about Server/Client Components** → any new component that uses
  `useState`, `useEffect`, `onClick`, etc. needs `'use client';` as its very first line.
- **Page loads but shows Railway's default "Hello" screen** → you generated a domain
  before the first deploy finished; redeploy or wait, then refresh.
