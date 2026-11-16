import { afterEach, describe, expect, it, vi } from "vitest";

import { queryClient } from "../../src/lib/query-client";
import { Route } from "../../src/routes/index";
import { githubAPI } from "../../src/services/api/github";

describe("home route loader in the browser", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    queryClient.clear();
  });

  it("doesn't wait for GitHub before showing the page", async () => {
    // GitHub never answers
    vi.spyOn(githubAPI, "fetchRepository").mockImplementation(() => new Promise(() => {}));
    const loader = Route.options.loader as () => Promise<unknown>;

    const outcome = await Promise.race([
      Promise.resolve(loader()).then(() => "loaded"),
      new Promise(resolve => setTimeout(resolve, 100, "waiting")),
    ]);

    expect(outcome).toBe("loaded");
  });
});
