import { ESLint } from "eslint";
// @vitest-environment node
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const eslint = new ESLint({ cwd: resolve(__dirname, "../..") });

// Agent state isn't committed. Linting it made a clean checkout pass
// `pnpm lint` and a working copy fail it.
describe("eslint ignores", () => {
  it("ignores agent state", async () => {
    expect(await eslint.isPathIgnored(".claude/save-points/01/1.json")).toBe(true);
  });

  // docs/v2 is committed, so CI checks its formatting like any other file
  it.each(["src/pages/projects-page.tsx", "docs/v2/pages-v2-copy.md", "docs/v2/timdehof-v2-prototype.html"])("lints %s", async (path) => {
    expect(await eslint.isPathIgnored(path)).toBe(false);
  });
});
