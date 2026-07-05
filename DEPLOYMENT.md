# 🚀 Mossroom Deployment Guide

This is the step-by-step process to take your local Mossroom project and deploy it to
mossroom.co on Cloudflare Pages.

Total time: 30–60 minutes. Total cost: **$0**.

---

## Prerequisites

You need:

- [x] A Cloudflare account (you have this ✓)
- [x] A domain on Cloudflare (mossroom.co ✓)
- [x] A GitHub account (free) — create one at https://github.com if you don't have it
- [x] Node.js 20+ (you have this ✓)
- [x] Git installed locally (you have this ✓)

---

## Step 1: Push the project to GitHub (5 min)

1. Go to https://github.com/new
2. Create a new repository:
   - **Name:** `mossroom-co`
   - **Visibility:** Public (so Cloudflare Pages can build it on the free tier)
   - **Do NOT** initialize with README, .gitignore, or license
3. Open a terminal in your project folder and run:

```bash
cd /path/to/mossroom-co
git init
git add .
git commit -m "Initial Mossroom scaffold"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mossroom-co.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

---

## Step 2: Connect Cloudflare Pages (5 min)

1. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create application** →
   **Pages** → **Connect to Git**
2. Select your `mossroom-co` repository
3. Click **Begin setup**
4. Configure build settings:
   - **Project name:** `mossroom-co`
   - **Production branch:** `main`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** *(leave blank)*
5. Click **Save and Deploy**

Cloudflare will build and deploy your site. First build takes 2-5 minutes.

---

## Step 3: Add your custom domain (5 min)

1. In Cloudflare Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `mossroom.co`
3. Cloudflare will automatically configure DNS (since the domain is on Cloudflare)
4. Wait 1-2 minutes for SSL certificate provisioning
5. Repeat for `www.mossroom.co` if you want both

Your site is now live at https://mossroom.co

---

## Step 4: Enable Decap CMS (10 min)

### Option A: Simple (skip for now)

If you don't need to edit content through a web UI yet, skip this step. You can edit
markdown files directly on GitHub.com or locally + push.

### Option B: Full CMS via web UI

#### 4a. Create a GitHub OAuth App

1. Go to https://github.com/settings/developers → **New OAuth App**
2. Fill in:
   - **Application name:** `Mossroom CMS`
   - **Homepage URL:** `https://mossroom.co`
   - **Authorization callback URL:** `https://YOUR-WORKER.workers.dev/callback`
     (you'll get this URL in step 4b)
3. Click **Register application**
4. Copy the **Client ID**
5. Click **Generate a new client secret** → copy the **Client Secret**

#### 4b. Deploy the OAuth Worker

```bash
cd workers/decap-oauth
npm install -g wrangler   # if not already installed
wrangler login
wrangler secret put GITHUB_CLIENT_ID
# paste your Client ID when prompted
wrangler secret put GITHUB_CLIENT_SECRET
# paste your Client Secret when prompted
wrangler deploy
```

After deploy, wrangler will print your worker URL (e.g.,
`https://decap-oauth.YOUR-SUBDOMAIN.workers.dev`).

#### 4c. Update config.yml

Open `public/admin/config.yml` and update:

```yaml
backend:
  name: github
  repo: YOUR-GITHUB-USERNAME/mossroom-co
  branch: main
  base_url: https://decap-oauth.YOUR-SUBDOMAIN.workers.dev  # <-- ADD THIS LINE
```

Commit and push:

```bash
git add public/admin/config.yml
git commit -m "Enable Decap CMS OAuth"
git push
```

Wait for Cloudflare to redeploy (~30 seconds).

#### 4d. Visit the admin panel

Go to https://mossroom.co/admin/

You'll be prompted to log in with GitHub. After auth, you can edit articles through
a web UI.

---

## Step 5: Verify everything works (5 min)

Visit these URLs and confirm they work:

- [ ] https://mossroom.co — homepage
- [ ] https://mossroom.co/articles — article index
- [ ] https://mossroom.co/articles/best-moss-for-closed-terrariums — sample article
- [ ] https://mossroom.co/categories/care-guide — category page
- [ ] https://mossroom.co/rss.xml — RSS feed
- [ ] https://mossroom.co/sitemap-index.xml — sitemap
- [ ] https://mossroom.co/about — about page

If anything 404s, check the Cloudflare Pages build log.

---

## Step 6: Customize before launch (varies)

### Update Discord URL

Edit `src/config.ts` and replace the placeholder Discord URL:

```ts
discordUrl: 'https://discord.gg/YOUR-ACTUAL-INVITE',
```

### Update newsletter

The newsletter form currently uses Buttondown. Either:

1. Create a free Buttondown account (https://buttondown.email), replace
   `MOSSROOM` in `src/pages/index.astro` with your actual username
2. OR swap to Mailchimp / ConvertKit / Substack by editing the form action

### Add your own bio / photo

Edit `src/pages/about.astro` to add your story.

---

## Going forward: how to add new articles

### Via Decap CMS (web UI)

1. Visit https://mossroom.co/admin/
2. Log in with GitHub
3. Click **New Article**
4. Fill in the form, write content
5. Click **Publish** (or save as draft)
6. Cloudflare auto-deploys in ~30 seconds

### Via direct git push (for the command-line comfortable)

```bash
# Create new article
cp src/content/articles/your-first-closed-terrarium.md \
   src/content/articles/my-new-article.md

# Edit it
code src/content/articles/my-new-article.md

# Push
git add src/content/articles/my-new-article.md
git commit -m "Add article: my new article"
git push
```

Cloudflare auto-deploys in ~30 seconds.

---

## Troubleshooting

### "Build failed" in Cloudflare Pages

Click on the failed deployment → **Build log**. Common issues:

- **Node version too old:** Set Node 20 in Cloudflare Pages → Settings → Functions →
  Compatibility flags. Or in package.json: `"engines": { "node": "20" }`.
- **Missing dependencies:** Run `npm install` locally and commit the package-lock.json
  file.
- **TypeScript errors:** Run `npm run build` locally and fix any errors shown.

### "Module not found" errors

Run `npm install` locally to sync node_modules, then commit
package-lock.json.

### "Domain not found" or SSL not provisioning

1. Make sure the domain is added to Cloudflare (you have this ✓)
2. Wait 5-10 minutes — SSL provisioning can take a few minutes
3. Check Cloudflare Pages → Custom domains → status

### CMS won't load

1. Check `public/admin/config.yml` is correctly configured
2. Verify OAuth Worker is deployed and secrets are set
3. Hard refresh the admin page (Cmd+Shift+R or Ctrl+Shift+R)
4. Check browser console for errors

### Article changes not showing

1. Confirm Cloudflare Pages redeployed (check Activity tab)
2. Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
3. Cloudflare caches aggressively — wait 1-2 minutes

---

## What's deployed

When you're done, your setup is:

- **Site:** https://mossroom.co (Cloudflare Pages, free tier)
- **Hosting cost:** $0
- **Custom domain:** $0 (already paid for mossroom.co)
- **CMS:** Decap CMS at /admin/ (free, open source)
- **OAuth:** Cloudflare Worker (free tier, 100k requests/day)
- **Analytics:** Plausible (free tier, under 10k visits)
- **Newsletter:** Buttondown or similar (free tier, <100 subscribers)

**Total monthly cost: $0**

You'll only start paying if you exceed free tier limits:
- Cloudflare Pages: 500 builds/month, unlimited bandwidth
- Cloudflare Workers: 100,000 requests/day
- Plausible: 10,000 visits/month
- Buttondown: 100 subscribers

For a new niche site, you'll be in free tier for 6-12+ months.

---

## Next steps after launch

1. **Add Plausible analytics** — sign up at https://plausible.io (free trial, then $9/mo
   for paid tier; or self-host for free)
2. **Submit sitemap to Google Search Console** — https://search.google.com/search-console
3. **Share on Reddit** — r/terrariums, r/houseplants (genuinely helpful posts only)
4. **Set up Discord** — create a server, link from site
5. **Start the newsletter** — first issue should go out within 2 weeks of launch
6. **Promote on Pinterest** — terrarium content does well there

Good luck. 🌿