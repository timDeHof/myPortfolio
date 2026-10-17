import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const template = readFileSync(resolve(__dirname, "../../index.html"), "utf8");

describe("index.html template", () => {
  // The prerender plugin replaces <title> but appends SEOHead's meta tags
  // after the template's, so a static description here becomes a second,
  // earlier description on every prerendered page.
  it("leaves the description and keywords to SEOHead", () => {
    expect(template).not.toMatch(/name="description"/);
    expect(template).not.toMatch(/name="keywords"/);
  });

  // The v1 hero these rules styled is gone, and no component uses the classes
  it("has no critical CSS for the v1 hero", () => {
    expect(template).not.toMatch(/\.hero-section\b/);
    expect(template).not.toMatch(/\.hero-title\b/);
  });
});
