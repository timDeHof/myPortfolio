import { beforeEach, describe, expect, it, vi } from "vitest";

import { githubAPI } from "../github";
import { createMockFetch } from "./test-utils";

describe("githubAPI Proxy Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
    // Reset env mock if needed, but here we expect the code to use the new base
  });

  it("should use the standalone worker URL for API requests", async () => {
    const mockUser = { login: "timDeHof" };
    globalThis.fetch = createMockFetch(200, mockUser);

    await githubAPI.fetchUser();

    // We expect the URL to be the new worker URL
    expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining("https://portfolio-api.ttdehof.workers.dev/api/github/users"));
  });
});
