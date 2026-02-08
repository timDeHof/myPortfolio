import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { Env } from '../index';

export const assets = new OpenAPIHono<{ Bindings: Env }>();

const getAssetRoute = createRoute({
  method: 'get',
  path: '/{key}',
  request: {
    params: z.object({
      key: z.string().openapi({ example: 'icons/react.svg' }),
    }),
  },
  responses: {
    200: {
      description: 'The asset file',
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({ error: z.string() }),
        },
      },
      description: 'Asset not found',
    },
  },
});

assets.openapi(getAssetRoute, async (c) => {
  const { key } = c.req.valid('param');
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