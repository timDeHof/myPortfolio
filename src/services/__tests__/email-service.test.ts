import { describe, it, expect, vi, beforeEach } from 'vitest';
import { env } from '../../lib/env';

// Mock env
vi.mock('../../lib/env', () => ({
  env: {
    VITE_API_BASE_URL: 'https://portfolio-api.ttdehof.workers.dev',
  },
}));

describe('sendEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  it('should successfully send an email', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { sendEmail } = await import("../email-service");
    const emailData = { from_name: "Test User", from_email: "test@example.com", message: "Hello" };
    
    await sendEmail(emailData);

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith(`${env.VITE_API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        subject: "New Contact Form Message from Test User",
        message: "Hello",
      }),
    });
  });

  it('should throw an error if response.ok is false', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Server error" }),
    });

    const { sendEmail } = await import("../email-service");
    const emailData = { from_name: "Test User", from_email: "test@example.com", message: "Hello" };
    await expect(sendEmail(emailData)).rejects.toThrow("Server error");
  });

  it('should throw a generic error for network issues', async () => {
    (globalThis.fetch as any).mockRejectedValue(new Error("Network issues"));

    const { sendEmail } = await import("../email-service");
    const emailData = { from_name: "Test User", from_email: "test@example.com", message: "Hello" };
    await expect(sendEmail(emailData)).rejects.toThrow("Network issues");
  });
});

describe('testEmailConfiguration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  it('should return true if email configuration is successful', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { testEmailConfiguration } = await import("../email-service");
    const result = await testEmailConfiguration();
    expect(result).toBe(true);
  });

  it('should return false if email configuration fails', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Failed" }),
    });

    const { testEmailConfiguration } = await import("../email-service");
    const result = await testEmailConfiguration();
    expect(result).toBe(false);
  });
});