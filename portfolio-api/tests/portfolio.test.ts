import { describe, it, expect, vi, beforeEach } from 'vitest';
import { app } from '../src/index';

describe('Portfolio Data API', () => {
  const mockEnv = {
    portfolio_db: {
      prepare: vi.fn().mockReturnValue({
        all: vi.fn().mockResolvedValue({
          results: [
            { id: 1, name: 'React', category: 'frontend', proficiency: 90 },
            { id: 2, name: 'Node.js', category: 'backend', proficiency: 85 }
          ]
        })
      })
    }
  };

  it('should return techstack data from D1', async () => {
    const res = await app.fetch(new Request('http://localhost/api/portfolio/techstack'), mockEnv);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.results).toHaveLength(2);
    expect(body.results[0].name).toBe('React');
  });

  it('should return services data from D1', async () => {
    mockEnv.portfolio_db.prepare.mockReturnValue({
      all: vi.fn().mockResolvedValue({
        results: [{ id: 1, title: 'Web Development', description: 'Full stack apps' }]
      })
    });
    const res = await app.fetch(new Request('http://localhost/api/portfolio/services'), mockEnv);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.results[0].title).toBe('Web Development');
  });

  it('should return certifications data from D1', async () => {
    mockEnv.portfolio_db.prepare.mockReturnValue({
      all: vi.fn().mockResolvedValue({
        results: [{ id: 1, title: 'AWS Certified', issuer: 'Amazon' }]
      })
    });
    const res = await app.fetch(new Request('http://localhost/api/portfolio/certifications'), mockEnv);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.results[0].title).toBe('AWS Certified');
  });
});
