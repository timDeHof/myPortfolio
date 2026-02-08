import { describe, it, expect, vi } from 'vitest';
import { app } from '../src/index';

describe('Assets Proxy API', () => {
  it('should return 404 if asset not found in R2', async () => {
    // Mock environment with R2 binding
    const mockEnv = {
      portfolio_assets: {
        get: vi.fn().mockResolvedValue(null),
      },
    };

    const res = await app.fetch(new Request('http://localhost/api/assets/missing.png'), mockEnv);
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toBe('Asset not found');
  });

  it('should return 200 and asset data if found in R2', async () => {
    const mockBody = new Uint8Array([1, 2, 3]);
    
    // Improved mock for R2 object
    const mockEnv = {
      portfolio_assets: {
        get: vi.fn().mockResolvedValue({
          body: new ReadableStream({
            start(controller) {
              controller.enqueue(mockBody);
              controller.close();
            }
          }),
          httpEtag: 'test-etag',
          writeHttpMetadata: (headers: Headers) => {
            headers.set('Content-Type', 'image/png');
          },
        }),
      },
    };

    const res = await app.fetch(new Request('http://localhost/api/assets/test.png'), mockEnv);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('image/png');
    expect(res.headers.get('etag')).toBe('test-etag');
    const blob = await res.blob();
    expect(blob.size).toBe(3);
  });
});