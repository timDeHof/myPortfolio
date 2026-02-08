import { Hono } from 'hono';
import { Env } from '../index';

export const blog = new Hono<{ Bindings: Env }>();

blog.get('/', async (c) => {
  const result = await c.env.portfolio_db.prepare('SELECT id, title, slug, excerpt, created_at FROM posts ORDER BY created_at DESC').all();
  return c.json(result);
});

blog.get('/:slug', async (c) => {
  const slug = c.req.param('slug');
  const post = await c.env.portfolio_db.prepare('SELECT * FROM posts WHERE slug = ?').bind(slug).first();

  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }

  return c.json(post);
});
