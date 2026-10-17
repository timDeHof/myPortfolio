import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";

import { buildEntries } from "../scripts/sitemap";
import { DEFAULT_NAV_ITEMS } from "../src/lib/constants";
import { routeTree } from "../src/routeTree.gen";
import { pageSEO } from "../src/utils/seo";

vi.mock("../src/pages/contact-page", () => ({ ContactPage: () => null }));

// P1: the Services page moves to Jokma's site, so timdehof.dev drops it
describe("services page removal", () => {
  it("is not in the nav", () => {
    expect(DEFAULT_NAV_ITEMS.map(item => item.href)).not.toContain("/services");
  });

  it("is not in the sitemap or prerender list", () => {
    expect(buildEntries().map(entry => entry.path)).not.toContain("/services");
  });

  it("has no page SEO entry", () => {
    expect(Object.keys(pageSEO)).not.toContain("services");
  });

  it("is redirected to /contact with a 301 on full page loads", () => {
    const redirects = readFileSync(resolve(__dirname, "../public/_redirects"), "utf8");
    const rules = redirects.split("\n").map(line => line.trim().split(/\s+/));
    expect(rules).toContainEqual(["/services", "/contact", "301"]);
    expect(rules).toContainEqual(["/services/", "/contact", "301"]);
  });

  it("is redirected to /contact by the client router", async () => {
    const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: ["/services"] }) });
    await router.load();
    expect(router.state.location.pathname).toBe("/contact");
  });
});
