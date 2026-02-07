import { describe, it, expect } from 'vitest';
// @ts-expect-error - index.ts doesn't exist yet
import worker from '../src/index';

describe('GitHub Proxy Worker', () => {
  it('should have a fetch handler', () => {
    expect(worker.fetch).toBeDefined();
  });
});
