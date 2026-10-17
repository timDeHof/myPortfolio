import { describe, expect, it } from "vitest";

import type { ProjectIndexEntry } from "../projects-index";

// Checked by `pnpm type-check`: the fallback is served as the whole project,
// so it must be a complete Project, not a partial one
describe("project index fallback data", () => {
  it("rejects an incomplete fallback", () => {
    const entry: ProjectIndexEntry = {
      slug: "example",
      owner: "timDeHof",
      repo: "portfolio-metadata",
      path: "example.json",
      // @ts-expect-error name alone is missing required Project fields
      fallbackData: { name: "Example" },
    };
    expect(entry.slug).toBe("example");
  });
});
