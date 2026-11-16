import type { Page } from "@playwright/test";

import { expect, test } from "@playwright/test";

const FALLBACK = "Open source";

// GitHub can't return a negative star count, so the page shows this only when
// the browser's fetch ran and its answer replaced the prerendered count
const FETCHED_STARS = -1;

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
    // Locally that skips. In CI it fails, so the check can't pass without running.
    const hasStarCount = /\d+★/.test(await (await request.get("/")).text());
    const reason = "The prerendered home page has no star count (GitHub was unreachable at build time)";
    if (test.info().config.metadata.isCI) {
      expect(hasStarCount, reason).toBe(true);
    }
    else {
      test.skip(!hasStarCount, reason);
    }
    await recordStarStat(page);
    // The prerendered count stays fresh for an hour (staleTime in
    // src/hooks/use-repo-stars.ts), so set the page's clock two hours ahead to
    // make the browser fetch it again
    await page.clock.install({ time: Date.now() + 2 * 60 * 60 * 1000 });
  });

  test("keeps the prerendered count while the browser fetch is in flight", async ({ page }) => {
    let answered = false;
    await page.route("**/github/**", async (route) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      await route.fulfill({ json: [{ name: "shadcn-timeline", stargazers_count: FETCHED_STARS }] });
      answered = true;
    });

    await page.goto("/");
    await expect.poll(() => answered).toBe(true);
    await expect.poll(async () => (await starStats(page)).at(-1)).toBe(`${FETCHED_STARS}★`);

    const stats = await starStats(page);
    expect(stats[0]).toMatch(/^\d+★$/);
    expect(stats).not.toContain(FALLBACK);
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
