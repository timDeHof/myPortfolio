import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { Env } from '../index';
import { SkillSchema, ServiceSchema, CertificationSchema } from '../schemas';

export const portfolio = new OpenAPIHono<{ Bindings: Env }>();

const getTechStackRoute = createRoute({
  method: 'get',
  path: '/techstack',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            results: z.array(SkillSchema),
          }),
        },
      },
      description: 'Retrieve the tech stack skills',
    },
  },
});

const getServicesRoute = createRoute({
  method: 'get',
  path: '/services',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            results: z.array(ServiceSchema),
          }),
        },
      },
      description: 'Retrieve portfolio services',
    },
  },
});

const getCertificationsRoute = createRoute({
  method: 'get',
  path: '/certifications',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            results: z.array(CertificationSchema),
          }),
        },
      },
      description: 'Retrieve portfolio certifications',
    },
  },
});

portfolio.openapi(getTechStackRoute, async (c) => {
  const result = await c.env.portfolio_db.prepare('SELECT * FROM skills').all();
  return c.json(result as any);
});

portfolio.openapi(getServicesRoute, async (c) => {
  const result = await c.env.portfolio_db.prepare('SELECT * FROM services').all();
  return c.json(result as any);
});

portfolio.openapi(getCertificationsRoute, async (c) => {
  const result = await c.env.portfolio_db.prepare('SELECT * FROM certifications').all();
  return c.json(result as any);
});