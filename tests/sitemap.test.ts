import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { buildEntries, renderSitemap, SITE_URL } from "../scripts/sitemap";
import { projectsIndex } from "../src/data/projects-index";

const SITEMAP_PATH = resolve(__dirname, "../public/sitemap.xml");
const ROUTES_DIR = resolve(__dirname, "../src/routes");

const sitemap = readFileSync(SITEMAP_PATH, "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

describe("sitemap", () => {
  it("is in sync with the generator", () => {
    // Fails if someone hand-edits public/sitemap.xml or forgets to rebuild
    // after changing the route list.
    expect(sitemap).toBe(renderSitemap(buildEntries()));
  });

  it("covers every file-based route", () => {
    // Derived from the filesystem so a new route that nobody adds to the
    // generator fails here rather than silently going unindexed.
    const routePaths = readdirSync(ROUTES_DIR)
      .filter(f => f.endsWith(".tsx") && !f.startsWith("__"))
      .map(f => f.replace(/\.(lazy\.)?tsx$/, ""))
      // projects.$slug is covered by the per-project URLs below
      .filter(f => !f.includes("$"))
      .map(f => (f === "index" ? "/" : `/${f.replace(/\./g, "/")}`));

    for (const path of routePaths) {
      expect(locs, `${path} missing from sitemap`).toContain(`${SITE_URL}${path}`);
    }
  });

  it("lists every project detail page", () => {
    for (const { slug } of projectsIndex) {
      expect(locs, `${slug} missing from sitemap`).toContain(`${SITE_URL}/projects/${slug}`);
    }
  });

  it("uses absolute https URLs with no duplicates", () => {
    expect(locs.length).toBeGreaterThan(0);
    expect(new Set(locs).size).toBe(locs.length);

    for (const loc of locs) {
      expect(new URL(loc).protocol).toBe("https:");
      expect(loc.startsWith(SITE_URL)).toBe(true);
    }
  });

  it("matches the host robots.txt advertises", () => {
    const robots = readFileSync(resolve(__dirname, "../public/robots.txt"), "utf8");
    expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  });
});
