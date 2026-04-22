import { vi } from "vitest";

/**
 * Creates a mock fetch function for testing API responses.
 * Defaults to a successful JSON response.
 */
export function createMockFetch(
  status: number,
  body: unknown,
  headers: HeadersInit = { "Content-Type": "application/json" },
) {
  return vi.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      statusText: `Status ${status}`,
      json: () => Promise.resolve(body),
      text: () => Promise.resolve(typeof body === "string" ? body : JSON.stringify(body)),
      headers: new Headers(headers),
    }),
  );
}