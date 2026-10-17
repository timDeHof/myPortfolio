// @vitest-environment node
import type { HelmetServerState } from "react-helmet-async";

import { useLocation } from "@tanstack/react-router";
import React from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SEOHead } from "../../src/components/common/seo-head";
import { useSEO } from "../../src/hooks/use-seo";

vi.mock("@tanstack/react-router", () => ({
  useLocation: vi.fn(),
}));

function SEOUrl() {
  return <span>{useSEO().url}</span>;
}

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
    expect(link).toContain("href=\"https://timdehof.dev/projects?project=cognidocs\"");
    expect(meta).toContain("content=\"https://timdehof.dev/projects?project=cognidocs\"");
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

  it("builds the useSEO url from the site origin and the search string", () => {
    const html = renderToString(<SEOUrl />);
    expect(html).toContain("https://timdehof.dev/projects?project=cognidocs");
  });
});
