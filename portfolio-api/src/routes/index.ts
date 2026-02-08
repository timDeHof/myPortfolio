import { OpenAPIHono } from '@hono/zod-openapi';
import { assets } from './assets';
import { portfolio } from './portfolio';
import { blog } from './blog';
import { contact } from './contact';
import { github } from './github';

export const routes = new OpenAPIHono();

// Mount namespaces
routes.route('/assets', assets);
routes.route('/portfolio', portfolio);
routes.route('/blog', blog);
routes.route('/contact', contact);
routes.route('/github', github);

// Health check
routes.get('/health', (c) => {
  return c.json({ status: 'ok', message: 'Unified Portfolio API is running' });
});
