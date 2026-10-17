import { describe, expect, it } from "vitest";

import { projectsIndex } from "../projects-index";

describe("projectsIndex", () => {
  it("lists the v2 projects in display order (P4)", () => {
    expect(projectsIndex.map(entry => entry.slug)).toEqual([
      "shadcn-timeline",
      "teamforward",
      "cognidocs",
      "habitgate-mobile",
    ]);
  });
});
