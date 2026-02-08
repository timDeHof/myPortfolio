import { Hono } from 'hono';
import { Env } from '../index';

export const github = new Hono<{ Bindings: Env }>();

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
    // Add CORS if not already present (Hono might handle this if configured globally, but keeping it explicit for proxy)
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    
    return newResponse;
  } catch (error) {
    return c.json({ error: 'GitHub Proxy Error', details: (error as Error).message }, 500);
  }
});
