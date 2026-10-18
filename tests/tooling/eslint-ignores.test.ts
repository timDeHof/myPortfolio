import { ESLint } from "eslint";
// @vitest-environment node
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const eslint = new ESLint({ cwd: resolve(__dirname, "../..") });

// Local notes and agent state that aren't committed. Linting them made a clean
// checkout pass `pnpm lint` and a working copy fail it.
describe("eslint ignores", () => {
  it.each(["docs/v2/pages-v2-copy.md", ".claude/save-points/01/1.json"])("ignores %s", async (path) => {
    expect(await eslint.isPathIgnored(path)).toBe(true);
  });

  it("still lints source files", async () => {
    expect(await eslint.isPathIgnored("src/pages/projects-page.tsx")).toBe(false);
  });
});
