import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(__dirname, "../../src/styles/index.css"), "utf8");

describe("mono font", () => {
  // Tailwind's default --font-mono starts with ui-monospace, so `font-mono`
  // skipped JetBrains Mono even where the rest of the CSS asks for it.
  it("points Tailwind's font-mono at JetBrains Mono", () => {
    const theme = css.match(/@theme inline \{([\s\S]*?)\n\}/)?.[1] ?? "";

    expect(theme).toMatch(/--font-mono:\s*"JetBrains Mono",/);
  });
});
