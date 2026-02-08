import { OpenAPIHono } from '@hono/zod-openapi';

export const routes = new OpenAPIHono();

// Placeholder for future routes
routes.get('/health', (c) => {
  return c.json({ status: 'ok', message: 'Unified Portfolio API is running' });
});
