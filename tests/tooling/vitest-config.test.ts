// @vitest-environment node
import { describe, expect, it } from "vitest";

import vitestConfig from "../../vitest.config";

const coverage = vitestConfig.test?.coverage;

describe("vitest coverage config", () => {
  // By default coverage counts only the files some test imports, so a file
  // with no tests at all is left out instead of counting as 0%
  it("measures every source file, not only the ones tests import", () => {
    expect(coverage?.include).toEqual(["src/**/*.{ts,tsx}"]);
    expect(coverage?.exclude).toEqual(expect.arrayContaining(["src/content/**", "src/types/**", "src/routeTree.gen.ts"]));
  });

  // src/** also matched .DS_Store files, which coverage failed to parse, and
  // counted test helpers in __tests__ as source
  it("measures only source code", () => {
    expect(coverage?.exclude).toContain("**/__tests__/**");
  });

  it("fails when coverage drops below a floor", () => {
    const thresholds = coverage && "thresholds" in coverage ? coverage.thresholds : undefined;

    for (const metric of ["statements", "branches", "functions", "lines"] as const) {
      expect(thresholds?.[metric], metric).toBeGreaterThan(0);
    }
  });
});

describe("vitest env", () => {
  // A local .env could otherwise set it, and App.tsx builds the React Query
  // devtools only in development, so local coverage differed from CI's
  it("runs tests with VITE_NODE_ENV set to test, whatever .env says", () => {
    // Compared as a boolean, so a failure doesn't print the local .env value
    expect(import.meta.env.VITE_NODE_ENV === "test").toBe(true);
  });
});
