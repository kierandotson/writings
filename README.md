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
