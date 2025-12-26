import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Helper function to mock fetch responses
function mockFetch(ok: boolean, body: any, status: number = 200) {
  return vi.fn(() =>
    Promise.resolve({
      ok,
      status,
      statusText: "OK",
      headers: new Headers(),
      redirected: false,
      type: "basic",
      url: "https://api.web3forms.com/submit",
      json: () => Promise.resolve(body),
      text: () => Promise.resolve(JSON.stringify(body)),
      clone: () => ({} as Response),
      body: null,
      bodyUsed: false,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
    } as Response),
  );
}

describe("sendEmail", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should throw error if Web3Forms access key is not configured", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "");
    const { sendEmail } = await import("../email-service");
    const emailData = { from_name: "Test", from_email: "test@example.com", message: "Hi" };
    await expect(sendEmail(emailData)).rejects.toThrow("Web3Forms access key not configured");
  });

  it("should throw error if Web3Forms access key is the default placeholder", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "YOUR_WEB3FORMS_ACCESS_KEY");
    const { sendEmail } = await import("../email-service");
    const emailData = { from_name: "Test", from_email: "test@example.com", message: "Hi" };
    await expect(sendEmail(emailData)).rejects.toThrow("Web3Forms access key not configured");
  });

  it("should successfully send an email", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test_access_key");
    const { sendEmail } = await import("../email-service");
    globalThis.fetch = mockFetch(true, { success: true, message: "Form submitted successfully" });

    const emailData = { from_name: "Test User", from_email: "test@example.com", message: "Hello" };
    await expect(sendEmail(emailData)).resolves.toBeUndefined();

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith("https://api.web3forms.com/submit", {
      method: "POST",
      body: expect.any(FormData),
    });
  });

  it("should throw an error if response.ok is false", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test_access_key");
    const { sendEmail } = await import("../email-service");
    globalThis.fetch = mockFetch(false, { success: false, message: "Server error" }, 500);

    const emailData = { from_name: "Test User", from_email: "test@example.com", message: "Hello" };
    await expect(sendEmail(emailData)).rejects.toThrow("Server error");
  });

  it("should throw an error if result.success is false", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test_access_key");
    const { sendEmail } = await import("../email-service");
    globalThis.fetch = mockFetch(true, { success: false, message: "Validation failed" });

    const emailData = { from_name: "Test User", from_email: "test@example.com", message: "Hello" };
    await expect(sendEmail(emailData)).rejects.toThrow("Validation failed");
  });

  it("should throw a generic error for network issues", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test_access_key");
    const { sendEmail } = await import("../email-service");
    const networkError = new Error("Network error");
    globalThis.fetch = vi.fn(() => Promise.reject(networkError));

    const emailData = { from_name: "Test User", from_email: "test@example.com", message: "Hello" };
    await expect(sendEmail(emailData)).rejects.toThrow("Network error");
    expect(console.error).toHaveBeenCalled();
  });
});

describe("testEmailConfiguration", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return true if email configuration is successful", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test_access_key");
    const { testEmailConfiguration } = await import("../email-service");
    globalThis.fetch = mockFetch(true, { success: true, message: "Form submitted successfully" });

    await expect(testEmailConfiguration()).resolves.toBe(true);
  });

  it("should return false if email configuration fails", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test_access_key");
    const { testEmailConfiguration } = await import("../email-service");
    const configError = new Error("Config error");
    globalThis.fetch = vi.fn(() => Promise.reject(configError));

    const result = await testEmailConfiguration();
    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalled();
  });
});
