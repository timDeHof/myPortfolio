import { expect, test } from "@playwright/test";
import { Buffer } from "node:buffer";

// The About loader waits for these files. Both sections have a fallback, so a
// failed fetch must not hold the page back. With retries it waited about 7s.
const MAX_NAVIGATION_MS = 2000;

// The file that doesn't fail gets a fixture, so the timing doesn't depend on the live API
const FIXTURES: Record<string, unknown> = {
  "testimonials.json": [],
  "portfolio.json": { certifications: [] },
};

// GitHub's contents API returns the file base64-encoded under `content`
function contentsResponse(data: unknown): { content: string } {
  return { content: Buffer.from(JSON.stringify(data)).toString("base64") };
}

for (const failing of Object.keys(FIXTURES)) {
  test(`opens About within ${MAX_NAVIGATION_MS}ms when ${failing} fails`, async ({ page }) => {
    for (const [file, data] of Object.entries(FIXTURES)) {
      await page.route(`**/${file}**`, route => file === failing
        ? route.fulfill({ status: 500, json: {} })
        : route.fulfill({ json: contentsResponse(data) }));
    }

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const start = Date.now();
    await page.getByRole("link", { name: "More about me" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Seven years in manufacturing", { timeout: 15000 });

    expect(Date.now() - start).toBeLessThan(MAX_NAVIGATION_MS);
  });
}
