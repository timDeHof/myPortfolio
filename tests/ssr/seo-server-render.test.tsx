// @vitest-environment node
import type { HelmetServerState } from "react-helmet-async";

import { useLocation } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SEOHead } from "../../src/components/common/seo-head";

vi.mock("@tanstack/react-router", () => ({
  useLocation: vi.fn(),
}));

describe("seo rendering without a browser (prerender)", () => {
  beforeEach(() => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: "/projects",
      searchStr: "?project=cognidocs",
      search: { project: "cognidocs" },
      hash: "gallery",
      href: "/projects?project=cognidocs#gallery",
    } as unknown as ReturnType<typeof useLocation>);
  });

  it("has no window in this environment", () => {
    expect(typeof window).toBe("undefined");
  });

  it("renders SEOHead with absolute URLs from the site origin", () => {
    const context: { helmet?: HelmetServerState } = {};

    renderToString(
      <HelmetProvider context={context}>
        <SEOHead seo={{ title: "Projects" }} />
      </HelmetProvider>,
    );

    const link = context.helmet?.link.toString() ?? "";
    const meta = context.helmet?.meta.toString() ?? "";
    expect(link).toContain("href=\"https://timdehof.dev/projects\"");
    expect(meta).toContain("content=\"https://timdehof.dev/projects\"");
    expect(meta).toContain("content=\"https://timdehof.dev/og-image.jpg\"");
  });

  it("leaves the hash fragment out of canonical and og:url", () => {
    const context: { helmet?: HelmetServerState } = {};

    renderToString(
      <HelmetProvider context={context}>
        <SEOHead seo={{ title: "Projects" }} />
      </HelmetProvider>,
    );

    expect(context.helmet?.link.toString()).not.toContain("#gallery");
    expect(context.helmet?.meta.toString()).not.toContain("#gallery");
  });

  // Otherwise a shared ?utm_source= link declares itself the canonical page
  it("leaves the query string out of canonical and og:url", () => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: "/about",
      searchStr: "?utm_source=linkedin",
      search: { utm_source: "linkedin" },
      hash: "",
      href: "/about?utm_source=linkedin",
    } as unknown as ReturnType<typeof useLocation>);
    const context: { helmet?: HelmetServerState } = {};

    renderToString(
      <HelmetProvider context={context}>
        <SEOHead seo={{ title: "About" }} />
      </HelmetProvider>,
    );

    expect(context.helmet?.link.toString()).toContain("rel=\"canonical\" href=\"https://timdehof.dev/about\"");
    expect(context.helmet?.meta.toString()).toContain("property=\"og:url\" content=\"https://timdehof.dev/about\"");
  });
});
