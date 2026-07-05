// Cloudflare Worker that proxies Decap CMS GitHub OAuth.
// Deploy this to your Cloudflare account, then set the URL as
// `backend.base_url` in /public/admin/config.yml.

// INSTRUCTIONS:
// 1. Create a GitHub OAuth App: https://github.com/settings/developers
//    - Homepage URL: https://mossroom.co
//    - Authorization callback URL: https://YOUR-WORKER.workers.dev/callback
// 2. Get the Client ID and Client Secret from the GitHub OAuth App.
// 3. Set these as Worker secrets:
//    wrangler secret put GITHUB_CLIENT_ID
//    wrangler secret put GITHUB_CLIENT_SECRET
// 4. Update the `owner` and `repo` constants below to match your GitHub repo.
// 5. Deploy: wrangler deploy
// 6. Update /public/admin/config.yml with the Worker URL.

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { hostname, pathname } = url;

    // Configuration — REPLACE these with your own repo
    const owner = 'YOUR-GITHUB-USERNAME';
    const repo = 'mossroom-co';
    const branch = 'main';

    const clientId = env.GITHUB_CLIENT_ID;
    const clientSecret = env.GITHUB_CLIENT_SECRET;

    // Route 1: /callback — GitHub redirects here with code
    if (pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return new Response('Missing code', { status: 400 });
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      });

      const tokenData = await tokenRes.json();

      if (tokenData.error) {
        return new Response(`OAuth error: ${tokenData.error_description}`, {
          status: 400,
        });
      }

      // Return Decap CMS's expected token response
      return new Response(
        JSON.stringify({ token: tokenData.access_token }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Route 2: / — Decap's auth initiation. Redirect to GitHub.
    if (pathname === '/') {
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', clientId);
      authUrl.searchParams.set('redirect_uri', `${url.origin}/callback`);
      authUrl.searchParams.set(
        'scope',
        'repo,user'
      );
      authUrl.searchParams.set('state', crypto.randomUUID());
      return Response.redirect(authUrl.toString(), 302);
    }

    return new Response('Decap CMS OAuth Worker — see /callback or /', {
      status: 404,
    });
  },
};