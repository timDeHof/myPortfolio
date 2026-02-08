import { OpenAPIHono } from '@hono/zod-openapi';
import { Env } from '../index';

export const github = new OpenAPIHono<{ Bindings: Env }>();

// Generic catch-all for GitHub proxy
// Note: Catch-all routes are tricky with OpenAPI, so we'll just handle the logic here.
github.all('/*', async (c) => {
  const path = c.req.path.replace('/api/github', '');
  const url = new URL(c.req.url);
  
  const targetUrl = `${c.env.GITHUB_API_URL}${path}${url.search}`;
  
  const headers = new Headers(c.req.raw.headers);
  if (c.env.GITHUB_PAT) {
    headers.set('Authorization', `token ${c.env.GITHUB_PAT}`);
  }
  headers.set('User-Agent', 'Portfolio-API-GitHub-Proxy');

  try {
    const response = await fetch(targetUrl, {
      method: c.req.method,
      headers: headers,
      body: c.req.method !== 'GET' && c.req.method !== 'HEAD' ? await c.req.arrayBuffer() : null,
    });

    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    
    return newResponse;
  } catch (error) {
    return c.json({ error: 'GitHub Proxy Error', details: (error as Error).message }, 500);
  }
});