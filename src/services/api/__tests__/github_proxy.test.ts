import { describe, it, expect, vi, beforeEach } from 'vitest';
import { githubAPI } from '../github';

// Helper function to mock fetch responses
const mockFetch = (status: number, body: any) => {
  return vi.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      statusText: `Status ${status}`,
      json: () => Promise.resolve(body),
      text: () => Promise.resolve(typeof body === 'string' ? body : JSON.stringify(body)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
  );
};

describe('githubAPI Proxy Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    // Reset env mock if needed, but here we expect the code to use the new base
  });

  it('should use the standalone worker URL for API requests', async () => {
    const mockUser = { login: 'timDeHof' };
    global.fetch = mockFetch(200, mockUser);

    await githubAPI.fetchUser();
    
    // We expect the URL to be the new worker URL
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('https://portfolio-api.ttdehof.workers.dev/github'));
  });
});
