import { describe, it, expect, vi, beforeEach } from 'vitest';
import { app } from '../src/index';

describe('Contact API', () => {
  const mockEnv = {
    RESEND_API_KEY: 're_test_123',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('should return 400 if validation fails', async () => {
    const res = await app.fetch(new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' }) // Missing fields and invalid name
    }), mockEnv);

    expect(res.status).toBe(400);
  });

  it('should send email via Resend and return 200 on success', async () => {
    // Mock Resend API response
    (global.fetch as any).mockResolvedValue(new Response(JSON.stringify({ id: 'msg_123' }), { status: 200 }));

    const contactData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Hello',
      message: 'This is a test message'
    };

    const res = await app.fetch(new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    }), mockEnv);

    expect(res.status).toBe(200);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.resend.com/emails',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Authorization': 'Bearer re_test_123',
          'Content-Type': 'application/json'
        })
      })
    );
    
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});
