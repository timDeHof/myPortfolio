import { Hono } from 'hono';
import { Env } from '../index';

export const portfolio = new Hono<{ Bindings: Env }>();

portfolio.get('/techstack', async (c) => {
  const result = await c.env.portfolio_db.prepare('SELECT * FROM skills').all();
  return c.json(result);
});

portfolio.get('/services', async (c) => {
  const result = await c.env.portfolio_db.prepare('SELECT * FROM services').all();
  return c.json(result);
});

portfolio.get('/certifications', async (c) => {
  const result = await c.env.portfolio_db.prepare('SELECT * FROM certifications').all();
  return c.json(result);
});
