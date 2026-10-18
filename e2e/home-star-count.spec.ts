import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";

const FALLBACK = "Open source";

declare global {
  interface Window {
    __starStats: string[];
  }
}

// Record every value the shadcn-timeline stat shows, from the first parse of
// the prerendered HTML through the app mounting and the browser fetch
async function recordStarStat(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.__starStats = [];
    const read = (): void => {
      const value = document.querySelector("#work article .font-sans")?.textContent;
      if (value && window.__starStats.at(-1) !== value) {
        window.__starStats.push(value);
      }
    };
    new MutationObserver(read).observe(document, { subtree: true, childList: true, characterData: true });
  });
}

async function starStats(page: Page): Promise<string[]> {
  return page.evaluate(() => window.__starStats);
}

test.describe("home star count", () => {
  test.beforeEach(async ({ page, request }) => {
    // The build fetches the count from GitHub. If that failed, the HTML already
    // says "Open source" and there is no number for the browser to keep.
    const html = await (await request.get("/")).text();
    test.skip(!/\d+★/.test(html), "The prerendered home page has no star count (GitHub was unreachable at build time)");
    await recordStarStat(page);
  });

  test("keeps the prerendered count while the browser fetch is in flight", async ({ page }) => {
    let answered = false;
    await page.route("**/github/**", async (route) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      await route.fulfill({ json: [{ name: "shadcn-timeline", stargazers_count: 317 }] });
      answered = true;
    });

    await page.goto("/");
    await expect.poll(() => answered).toBe(true);
    await expect.poll(async () => (await starStats(page)).at(-1)).toBe("317★");

    expect(await starStats(page)).not.toContain(FALLBACK);
  });

  test("keeps the prerendered count when the browser fetch fails", async ({ page }) => {
    let failed = false;
    await page.route("**/github/**", async (route) => {
      failed = true;
      await route.fulfill({ status: 500, json: {} });
    });

    await page.goto("/");
    await expect.poll(() => failed).toBe(true);
    await page.waitForLoadState("networkidle");

    const stats = await starStats(page);
    expect(stats).not.toContain(FALLBACK);
    expect(stats.at(-1)).toMatch(/\d+★/);
  });
});
