import { z } from '@hono/zod-openapi';

export const SkillSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  name: z.string().openapi({ example: 'React' }),
  category: z.string().openapi({ example: 'frontend' }),
  proficiency: z.number().openapi({ example: 90 }),
  icon_key: z.string().nullable().openapi({ example: 'icons/react.svg' }),
  created_at: z.string().openapi({ example: '2026-02-08T00:00:00Z' }),
}).openapi('Skill');

export const ServiceSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  title: z.string().openapi({ example: 'Web Development' }),
  description: z.string().openapi({ example: 'Full stack applications' }),
  icon_key: z.string().nullable().openapi({ example: 'icons/web.svg' }),
  created_at: z.string().openapi({ example: '2026-02-08T00:00:00Z' }),
}).openapi('Service');

export const CertificationSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  title: z.string().openapi({ example: 'AWS Certified' }),
  issuer: z.string().openapi({ example: 'Amazon' }),
  issue_date: z.string().nullable().openapi({ example: '2025-01-01' }),
  url: z.string().nullable().openapi({ example: 'https://cert.com' }),
  icon_key: z.string().nullable().openapi({ example: 'icons/aws.svg' }),
  created_at: z.string().openapi({ example: '2026-02-08T00:00:00Z' }),
}).openapi('Certification');

export const PostSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  title: z.string().openapi({ example: 'My First Post' }),
  slug: z.string().openapi({ example: 'my-first-post' }),
  excerpt: z.string().nullable().openapi({ example: 'An introduction to my blog.' }),
  created_at: z.string().openapi({ example: '2026-02-08T00:00:00Z' }),
}).openapi('Post');

export const DetailedPostSchema = PostSchema.extend({
  content: z.string().openapi({ example: '# Hello World\\nThis is the post content.' }),
  metadata: z.string().nullable().openapi({ example: '{"tags":["tech"]}' }),
  updated_at: z.string().openapi({ example: '2026-02-08T00:00:00Z' }),
}).openapi('DetailedPost');
