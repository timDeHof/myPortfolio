import { expect, test } from "@playwright/test";

// The footer is ink in both themes, so its hover background must not come
// from the theme, or the accent text loses contrast in one of them
for (const theme of ["light", "dark"]) {
  test(`footer Back to top keeps 4.5:1 contrast on hover in ${theme} mode`, async ({ page }) => {
    await page.addInitScript(t => localStorage.setItem("portfolio-storage", JSON.stringify({ state: { theme: t }, version: 0 })), theme);
    await page.emulateMedia({ colorScheme: theme as "light" | "dark" });
    await page.goto("/");

    const backToTop = page.locator("footer .back-to-top");
    await backToTop.scrollIntoViewIfNeeded();
    await backToTop.hover();
    // The hover colors fade in over 300ms, so measure once the transitions finish
    await backToTop.evaluate(async (element) => {
      await new Promise(requestAnimationFrame);
      await Promise.all(element.getAnimations().map(animation => animation.finished));
    });

    // Blend the hover background over the footer's, as the page draws it, then
    // compute the WCAG contrast ratio of the text against the result
    const ratio = await backToTop.evaluate((element) => {
      const pixel = (...colors: string[]): number[] => {
        const context = Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d")!;
        for (const color of colors) {
          context.fillStyle = color;
          context.fillRect(0, 0, 1, 1);
        }
        return [...context.getImageData(0, 0, 1, 1).data.slice(0, 3)];
      };
      const luminance = (rgb: number[]): number => rgb
        .map(value => value / 255)
        .map(value => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4))
        .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);

      const footer = element.closest("footer")!;
      const text = luminance(pixel(getComputedStyle(element).color));
      const background = luminance(pixel(getComputedStyle(footer).backgroundColor, getComputedStyle(element).backgroundColor));
      return (Math.max(text, background) + 0.05) / (Math.min(text, background) + 0.05);
    });

    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
}
