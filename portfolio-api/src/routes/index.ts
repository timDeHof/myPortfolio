import { OpenAPIHono } from '@hono/zod-openapi';
import { assets } from './assets';

export const routes = new OpenAPIHono();

// Mount namespaces
routes.route('/assets', assets);

// Health check
routes.get('/health', (c) => {
  return c.json({ status: 'ok', message: 'Unified Portfolio API is running' });
});