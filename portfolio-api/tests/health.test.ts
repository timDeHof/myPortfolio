import { describe, it, expect, vi } from 'vitest';
import { app } from '../src/index';

describe('API Health Check', () => {
  it('should return 200 OK', async () => {
    const res = await app.request('/api/health');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ status: 'ok', message: 'Unified Portfolio API is running' });
  });
});
