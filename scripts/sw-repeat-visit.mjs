// Repeat-visit check for the service worker (plan step A5, risk R1).
// Usage: node scripts/sw-repeat-visit.mjs <base-url>   e.g. http://localhost:4180
// Visit 1 installs the service worker. Visit 2 must be answered by it and
// must contain the /about page, not the home page that index.html holds.
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:4180";
// Uses the installed Chrome so the check needs no Playwright browser download
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
page.on("console", msg => msg.type() === "error" && console.log("console error:", msg.text()));

await page.goto(`${base}/`);
await page.evaluate(() => navigator.serviceWorker.ready);
await page.reload(); // let the active worker take control of this client
const controlled = await page.evaluate(() => Boolean(navigator.serviceWorker.controller));

const response = await page.goto(`${base}/about`);
const fromServiceWorker = response.fromServiceWorker();
const html = await response.text();
const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/)?.[1] ?? null;

await browser.close();

const result = { controlled, fromServiceWorker, ogTitle, hasCareerTimeline: html.includes("Career Timeline") };
console.log(JSON.stringify(result, null, 2));
const pass = controlled && fromServiceWorker && result.hasCareerTimeline && ogTitle?.startsWith("About");
console.log(pass ? "PASS" : "FAIL");
process.exit(pass ? 0 : 1);
