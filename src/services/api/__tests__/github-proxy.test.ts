import { beforeEach, describe, expect, it, vi } from "vitest";

import { env } from "@/lib/env";

import { githubAPI } from "../github";
import { createMockFetch } from "./test-utils";

describe("githubAPI Proxy Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn();
  });

  it("routes GitHub requests through the configured API base URL", async () => {
    const mockUser = { login: "timDeHof" };
    globalThis.fetch = createMockFetch(200, mockUser);

    await githubAPI.fetchUser();

    // Asserted against the configured base rather than a hardcoded host. The
    // literal that used to be here matched only because a local .env happened
    // to set that value; with no .env the schema default applied and this
    // failed in CI while passing on every developer machine.
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`${env.VITE_API_BASE_URL}/github/users`),
    );
  });
});
