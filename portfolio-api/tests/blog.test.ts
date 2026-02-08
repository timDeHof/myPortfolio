import { describe, it, expect, vi } from 'vitest';
import { app } from '../src/index';

describe('Blog API', () => {
  const mockEnv = {
    portfolio_db: {
      prepare: vi.fn().mockReturnValue({
        all: vi.fn().mockResolvedValue({
          results: [
            { id: 1, title: 'My First Post', slug: 'my-first-post' },
            { id: 2, title: 'Second Post', slug: 'second-post' }
          ]
        }),
        bind: vi.fn().mockReturnValue({
          first: vi.fn().mockResolvedValue({
            id: 1,
            title: 'My First Post',
            slug: 'my-first-post',
            content: 'Hello world'
          })
        })
      })
    }
  };

  it('should list all blog posts', async () => {
    const res = await app.fetch(new Request('http://localhost/api/blog'), mockEnv);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.results).toHaveLength(2);
  });

  it('should fetch a single post by slug', async () => {
    const res = await app.fetch(new Request('http://localhost/api/blog/my-first-post'), mockEnv);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.title).toBe('My First Post');
  });

  it('should return 404 if post not found', async () => {
    mockEnv.portfolio_db.prepare.mockReturnValue({
      bind: vi.fn().mockReturnValue({
        first: vi.fn().mockResolvedValue(null)
      })
    });
    const res = await app.fetch(new Request('http://localhost/api/blog/missing'), mockEnv);
    expect(res.status).toBe(404);
  });
});
