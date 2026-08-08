import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { projectsIndex } from "../src/data/projects-index";

export const SITE_URL = "https://timdehof.dev";

interface SitemapEntry {
  path: string;
  changefreq: string;
  priority: string;
}

/**
 * Every crawlable URL on the site.
 *
 * Deliberately no <lastmod>: the hand-maintained sitemap carried a stale
 * 2024-12-01 for over a year, and stamping the build date would rewrite the
 * file on every build. Search engines discount lastmod they cannot trust, so
 * omitting it beats publishing a wrong one.
 */
export function buildEntries(): SitemapEntry[] {
  const staticRoutes: SitemapEntry[] = [
    { path: "/", changefreq: "monthly", priority: "1.0" },
    { path: "/about", changefreq: "monthly", priority: "0.8" },
    { path: "/projects", changefreq: "weekly", priority: "0.9" },
    { path: "/blog", changefreq: "weekly", priority: "0.8" },
    { path: "/services", changefreq: "monthly", priority: "0.8" },
    { path: "/contact", changefreq: "monthly", priority: "0.7" },
  ];

  const projectRoutes: SitemapEntry[] = projectsIndex.map(entry => ({
    path: `/projects/${entry.slug}`,
    changefreq: "monthly",
    priority: "0.7",
  }));

  return [...staticRoutes, ...projectRoutes];
}

export function renderSitemap(entries: SitemapEntry[]): string {
  const urls = entries
    .map(entry => [
      "  <url>",
      `    <loc>${SITE_URL}${entry.path}</loc>`,
      `    <changefreq>${entry.changefreq}</changefreq>`,
      `    <priority>${entry.priority}</priority>`,
      "  </url>",
    ].join("\n"))
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function writeSitemap(publicDir: string): string {
  const xml = renderSitemap(buildEntries());
  writeFileSync(resolve(publicDir, "sitemap.xml"), xml, "utf8");
  return xml;
}
