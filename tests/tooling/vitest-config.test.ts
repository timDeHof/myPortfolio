// @vitest-environment node
import { describe, expect, it } from "vitest";

import vitestConfig from "../../vitest.config";

const coverage = vitestConfig.test?.coverage;

describe("vitest coverage config", () => {
  // By default coverage counts only the files some test imports, so a file
  // with no tests at all is left out instead of counting as 0%
  it("measures every source file, not only the ones tests import", () => {
    expect(coverage?.include).toEqual(["src/**"]);
    expect(coverage?.exclude).toEqual(expect.arrayContaining(["src/content/**", "src/types/**", "src/routeTree.gen.ts"]));
  });

  it("fails when coverage drops below a floor", () => {
    const thresholds = coverage && "thresholds" in coverage ? coverage.thresholds : undefined;

    for (const metric of ["statements", "branches", "functions", "lines"] as const) {
      expect(thresholds?.[metric], metric).toBeGreaterThan(0);
    }
  });
});
