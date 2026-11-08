import { expect, test } from "@playwright/test";

// A color written as bare HSL numbers, such as `color:220 9% 46%`, is invalid
// CSS, so browsers drop the declaration. Custom properties may hold bare
// numbers, since hsl(var(--x)) wraps them where they are used.
const BARE_HSL = /(?<![-\w])([a-z][a-z-]*):((?:color-mix\(in oklab,\s*)?\d+(?:\.\d+)? \d+(?:\.\d+)?% \d+(?:\.\d+)?%)/g;

test("the built CSS has no bare HSL color values", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.locator("link[rel=\"stylesheet\"][href^=\"/\"]").evaluateAll(links => links.map(link => link.getAttribute("href") ?? ""));
  expect(hrefs.length).toBeGreaterThan(0);

  const bare: string[] = [];
  for (const href of hrefs) {
    const css = await (await request.get(href)).text();
    for (const rule of css.matchAll(/([^{};]+)\{([^{}]*)\}/g)) {
      for (const declaration of rule[2].matchAll(BARE_HSL)) {
        bare.push(`${rule[1].trim()} { ${declaration[0]} }`);
      }
    }
  }

  expect(bare).toEqual([]);
});
