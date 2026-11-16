import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(__dirname, "../../src/styles/index.css"), "utf8");

describe("v2 line button", () => {
  // The theme tokens are bare HSL numbers, so `@apply text-foreground` here
  // compiles to `color: 222 47% 11%`, an invalid value the browser drops.
  it("sets its text color from the foreground variable", () => {
    const rules = [...css.matchAll(/&\.btn--line \{([^}]*)\}/g)].map(match => match[1]).join("\n");

    expect(rules).not.toMatch(/@apply[^;]*\stext-foreground\b/);
    expect(rules).toMatch(/color: hsl\(var\(--foreground\)\);/);
  });
});
