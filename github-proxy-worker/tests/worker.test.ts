import { describe, it, expect, vi } from 'vitest';
import worker from '../src/index';

describe('GitHub Proxy Worker', () => {
  it('should forward requests to GitHub API with Authorization header', async () => {
    const mockEnv = {
      GITHUB_PAT: 'test-token',
      GITHUB_API_URL: 'https://api.github.com'
    };
    
    const request = new Request('https://proxy.com/user/repos');
    
    // Mock the global fetch
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );
    
    const response = await worker.fetch(request, mockEnv, {} as any);
    
    expect(fetchSpy).toHaveBeenCalled();
    const [callUrl, callInit] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(callUrl).toBe('https://api.github.com/user/repos');
    
    const headers = callInit.headers as Headers;
    expect(headers.get('Authorization')).toBe('token test-token');
    expect(headers.get('User-Agent')).toBe('Cloudflare-Worker-GitHub-Proxy');
    
    const data = await response.json();
    expect(data.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    
    fetchSpy.mockRestore();
  });

  it('should handle errors from GitHub API', async () => {
    const mockEnv = {
      GITHUB_PAT: 'test-token',
      GITHUB_API_URL: 'https://api.github.com'
    };
    
    const request = new Request('https://proxy.com/invalid');
    
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response('Not Found', { status: 404 })
    );
    
    const response = await worker.fetch(request, mockEnv, {} as any);
    
    expect(response.status).toBe(404);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    
    fetchSpy.mockRestore();
  });

  it('should handle CORS preflight', async () => {
    const mockEnv = {
      GITHUB_PAT: 'test-token',
      GITHUB_API_URL: 'https://api.github.com'
    };
    
    const request = new Request('https://proxy.com/user/repos', {
      method: 'OPTIONS'
    });
    
    const response = await worker.fetch(request, mockEnv, {} as any);
    
    expect(response.status).toBe(200);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(response.headers.get('Access-Control-Allow-Methods')).toContain('OPTIONS');
  });
});
