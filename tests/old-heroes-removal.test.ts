import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// A4: hero.section.tsx replaced both v1 heroes, so they and the illustration go
describe("v1 hero removal", () => {
  it.each([
    "hero-terminal.tsx",
    "hero-section.tsx",
    "hero-illustration.tsx",
  ])("has no src/components/home/%s", (file) => {
    expect(existsSync(resolve(__dirname, "../src/components/home", file))).toBe(false);
  });
});
