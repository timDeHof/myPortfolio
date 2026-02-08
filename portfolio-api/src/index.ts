import { OpenAPIHono } from '@hono/zod-openapi';
import { routes } from './routes';

const app = new OpenAPIHono();

// Mount the routes at /api
app.route('/api', routes);

export default app;
export { app };