# 🌿 Mossroom

The trusted knowledge hub for terrarium builders.

Built on Astro + Tailwind CSS, deployed to Cloudflare Pages, content managed by Decap CMS.

## What's here

- **32 article stubs** across 6 categories (care, plant profiles, sourcing, problem-solving, inspiration, beginner)
- **Editorial workflow** via Decap CMS at `/admin/`
- **SEO-ready** with sitemap, RSS feed, structured data
- **Mobile-first** responsive design
- **Privacy-friendly** analytics (Plausible)
- **Free newsletter** integration (Buttondown)

## Quick start

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# → http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project structure

```
mossroom-co/
├── src/
│   ├── components/          # Astro components (Header, Footer, ArticleCard)
│   ├── content/
│   │   ├── config.ts        # Content collection schema
│   │   └── articles/        # 32 article markdown files
│   ├── layouts/             # Page layouts
│   ├── pages/               # Routes (index, articles, categories, etc.)
│   ├── styles/              # Global CSS
│   └── config.ts            # Site config
├── public/
│   ├── admin/               # Decap CMS admin panel
│   │   ├── index.html       # CMS UI
│   │   └── config.yml       # CMS configuration
│   ├── favicon.svg
│   └── robots.txt
├── workers/
│   └── decap-oauth/         # Cloudflare Worker for GitHub OAuth
├── astro.config.mjs         # Astro config
├── tailwind.config.mjs      # Tailwind theme
└── package.json
```

## Tech stack

- **[Astro](https://astro.build)** — Static site generator, minimal JS
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first CSS
- **[Decap CMS](https://decapcms.org)** — Git-based CMS for content editing
- **[Cloudflare Pages](https://pages.cloudflare.com)** — Hosting (free tier)
- **[Cloudflare Workers](https://workers.cloudflare.com)** — OAuth proxy (free tier)
- **[Plausible](https://plausible.io)** — Privacy-friendly analytics

## Costs

$0/month at launch. Scales to thousands of visitors/month before needing to pay for
anything.

See `DEPLOYMENT.md` for the step-by-step deployment guide.

## Adding content

### Via the CMS

Visit `/admin/` after deployment. Log in with GitHub. Create / edit / publish
articles through the web UI.

### Via direct file edit

Add a markdown file to `src/content/articles/` with the required frontmatter:

```markdown
---
title: "Your article title"
description: "Short description for SEO and previews"
pubDate: 2026-07-05
category: care-guide
difficulty: beginner
tags: ["tag1", "tag2"]
author: "Your Name"
readingTime: 8
draft: false
---

Your article content here...
```

Then commit and push:

```bash
git add src/content/articles/your-article.md
git commit -m "Add article: your title"
git push
```

Cloudflare Pages auto-deploys within 30 seconds.

## Article categories

- `care-guide` — How-to guides, watering, light, substrate
- `plant-profile` — Detailed species care
- `sourcing` — Where to find materials ethically
- `problem-solving` — Diagnosis and fixes
- `inspiration` — Build ideas, project logs
- `beginner` — First-time builder content

## License

Content is © Mossroom. Code is MIT licensed.