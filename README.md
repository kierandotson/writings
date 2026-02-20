# Writings app

A small Vue app for publishing writings to a website. Add or edit files in `content/` and rebuild to see them on the site.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Add new writing

1. Add a `.md` file under:
   - `content/blog/` — blog posts
   - `content/poems/` — poems
   - `content/philosophy/` — philosophy

2. Use optional frontmatter at the top:

```yaml
---
title: Your title
date: 2025-02-19
excerpt: Short summary for listing pages
---

Your content in **markdown** here.
```

3. Run `npm run build` (or push to git if your deploy builds automatically). New and updated posts will appear on the site.

## Build for production

```bash
npm run build
```

Output is in `dist/`. Serve that folder with any static host or use `npm run preview` to test locally.

## Deploy to GitHub Pages

1. **Create a GitHub repo** (if you haven’t) and push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/kierandotson/writings.git
   git branch -M main
   git push -u origin main
   ```

2. **Turn on GitHub Pages** for the repo:
   - Repo → **Settings** → **Pages**
   - Under **Build and deployment**, set **Source** to **GitHub Actions**

3. **Trigger a deploy**: Push to `main` or run the **Deploy to GitHub Pages** workflow from the **Actions** tab. The site will be at:
   - **Project site:** `https://<username>.github.io/writings/`

4. **Custom domain (optional):** In **Settings → Pages**, set your domain. Then in `.github/workflows/deploy.yml`, set `BASE_PATH: ''` in the Build step so the app is served at the root.
