import { Hono } from 'hono';
import { Env } from '../index';

export const assets = new Hono<{ Bindings: Env }>();

assets.get('/:key', async (c) => {
  const key = c.req.param('key');
  const object = await c.env.portfolio_assets.get(key);

  if (!object) {
    return c.json({ error: 'Asset not found' }, 404);
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);

  return new Response(object.body, {
    headers,
  });
});
