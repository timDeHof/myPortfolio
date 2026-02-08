import { describe, it, expect, vi, beforeEach } from 'vitest';
import { app } from '../src/index';

describe('GitHub Proxy API', () => {
  const mockEnv = {
    GITHUB_PAT: 'ghp_test_token',
    GITHUB_API_URL: 'https://api.github.com'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('should forward requests to GitHub with Authorization header', async () => {
    (global.fetch as any).mockResolvedValue(new Response(JSON.stringify({ login: 'timDeHof' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }));

    const res = await app.fetch(new Request('http://localhost/api/github/user'), mockEnv);
    
    expect(res.status).toBe(200);
    expect(global.fetch).toHaveBeenCalled();
    
    const [url, init] = (global.fetch as any).mock.calls[0];
    expect(url).toBe('https://api.github.com/user');
    
    const headers = init.headers as Headers;
    expect(headers.get('Authorization')).toBe('token ghp_test_token');
    expect(headers.get('User-Agent')).toBe('Portfolio-API-GitHub-Proxy');
  });
});