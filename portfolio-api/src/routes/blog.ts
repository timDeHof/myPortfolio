import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { Env } from '../index';
import { PostSchema, DetailedPostSchema } from '../schemas';

export const blog = new OpenAPIHono<{ Bindings: Env }>();

const listPostsRoute = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            results: z.array(PostSchema),
          }),
        },
      },
      description: 'List blog posts',
    },
  },
});

const getPostRoute = createRoute({
  method: 'get',
  path: '/{slug}',
  request: {
    params: z.object({
      slug: z.string().openapi({ example: 'my-first-post' }),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: DetailedPostSchema,
        },
      },
      description: 'Get a single blog post',
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({ error: z.string() }),
        },
      },
      description: 'Post not found',
    },
  },
});

blog.openapi(listPostsRoute, async (c) => {
  const result = await c.env.portfolio_db.prepare('SELECT id, title, slug, excerpt, created_at FROM posts ORDER BY created_at DESC').all();
  return c.json(result as any);
});

blog.openapi(getPostRoute, async (c) => {
  const { slug } = c.req.valid('param');
  const post = await c.env.portfolio_db.prepare('SELECT * FROM posts WHERE slug = ?').bind(slug).first();

  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }

  return c.json(post as any);
});