import { expect, test } from "@playwright/test";

// The About loader waits for these files. Both sections have a fallback, so a
// failed fetch must not hold the page back. With retries it waited about 7s.
const MAX_NAVIGATION_MS = 2000;

for (const file of ["testimonials.json", "portfolio.json"]) {
  test(`opens About within ${MAX_NAVIGATION_MS}ms when ${file} fails`, async ({ page }) => {
    await page.route(`**/${file}**`, route => route.fulfill({ status: 500, json: {} }));

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const start = Date.now();
    await page.getByRole("link", { name: "More about me" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Seven years in manufacturing", { timeout: 15000 });

    expect(Date.now() - start).toBeLessThan(MAX_NAVIGATION_MS);
  });
}
