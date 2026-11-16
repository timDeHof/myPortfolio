import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const template = readFileSync(resolve(__dirname, "../../index.html"), "utf8");

// Inline classic scripts in <head> run while the parser reaches them, before
// the body is painted. Module, deferred and async scripts run too late.
function blockingHeadScripts(): string[] {
  const head = new DOMParser().parseFromString(template, "text/html").head;
  return [...head.querySelectorAll("script:not([src]):not([type]):not([defer]):not([async])")].map(script => script.textContent ?? "");
}

describe("index.html theme script", () => {
  const matchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = matchMedia;
    localStorage.clear();
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.style.colorScheme = "";
  });

  // useTheme only applies the class in an effect, after the prerendered page
  // has already painted in light
  it.each([
    ["the stored theme is dark", "dark", false, true],
    ["the theme is system and the OS is dark", "system", true, true],
    ["nothing is stored and the OS is dark", undefined, true, true],
    ["the stored theme is light and the OS is dark", "light", true, false],
  ])("sets the dark class before the first paint when %s", (_case, stored, isOsDark, isDark) => {
    if (stored) {
      localStorage.setItem("portfolio-storage", JSON.stringify({ state: { theme: stored }, version: 0 }));
    }
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      ...matchMedia(query),
      matches: isOsDark && query === "(prefers-color-scheme: dark)",
    }));

    for (const script of blockingHeadScripts()) {
      // eslint-disable-next-line no-new-func
      new Function(script)();
    }

    expect(document.documentElement.classList.contains("dark")).toBe(isDark);
  });
});

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

  // The CSS names JetBrains Mono first in every mono stack, so without this
  // load the title block and other mono text fall back to a smaller font.
  it("loads JetBrains Mono from Google Fonts, with and without JavaScript", () => {
    const fontUrls = template.match(/https:\/\/fonts\.googleapis\.com\/css2\?[^"]+/g) ?? [];

    expect(fontUrls).toHaveLength(2);
    for (const url of fontUrls) {
      expect(url).toContain("family=JetBrains+Mono:wght@400;500;700");
    }
  });
});
