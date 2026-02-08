import { OpenAPIHono } from '@hono/zod-openapi';
import { routes } from './routes';

export interface Env {
  portfolio_db: D1Database;
  portfolio_assets: R2Bucket;
}

const app = new OpenAPIHono<{ Bindings: Env }>();

// Mount the routes at /api
app.route('/api', routes);

export default app;
export { app };
