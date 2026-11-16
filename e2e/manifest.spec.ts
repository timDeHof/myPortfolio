import { expect, test } from "@playwright/test";

// vite-plugin-pwa generates and links its own manifest unless told not to,
// which puts a second, generic manifest next to public/manifest.json
test("the built page links only public/manifest.json", async ({ page }) => {
  await page.goto("/");

  const manifests = page.locator("link[rel=\"manifest\"]");
  await expect(manifests).toHaveCount(1);
  await expect(manifests).toHaveAttribute("href", "/manifest.json");
});
