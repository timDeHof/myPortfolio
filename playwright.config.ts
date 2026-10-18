import { defineConfig, devices } from "@playwright/test";

const PORT = 4174;

// End-to-end tests run against the production build in build/, so they see the
// prerendered HTML exactly as visitors get it. Run `pnpm build` first.
export default defineConfig({
  testDir: "./e2e",
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // The PWA service worker would serve cached assets and hide what the page does on a cold load
    serviceWorkers: "block",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `pnpm exec vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
});
