import { OpenAPIHono } from '@hono/zod-openapi';
import { assets } from './assets';
import { portfolio } from './portfolio';

export const routes = new OpenAPIHono();

// Mount namespaces
routes.route('/assets', assets);
routes.route('/portfolio', portfolio);

// Health check
routes.get('/health', (c) => {
  return c.json({ status: 'ok', message: 'Unified Portfolio API is running' });
});
