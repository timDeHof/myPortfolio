import { useLocation } from "@tanstack/react-router";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useSectionSEO, useSEO } from "../../src/hooks/use-seo";

// Mock @tanstack/react-router
vi.mock("@tanstack/react-router", () => ({
  useLocation: vi.fn(),
}));

// Mock SEO utils
vi.mock("../../src/utils/seo", () => ({
  SITE_URL: "https://timdehof.dev",
  defaultSEO: {
    title: "Default Title",
    description: "Default Description",
  },
  pageSEO: {
    home: { title: "Home Title" },
    about: { title: "About Title" },
  },
}));

describe("useSEO", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useLocation as any).mockReturnValue({
      pathname: "/",
      searchStr: "",
    });

    // A dev-server origin must not leak into canonical URLs
    Object.defineProperty(window, "location", {
      value: { origin: "http://localhost" },
      writable: true,
    });
  });

  it("returns home SEO for root path", () => {
    const { result } = renderHook(() => useSEO());
    expect(result.current.title).toBe("Home Title");
    expect(result.current.url).toBe("https://timdehof.dev/");
  });

  it("includes the search string in the url", () => {
    (useLocation as any).mockReturnValue({
      pathname: "/projects",
      searchStr: "?project=cognidocs",
      search: { project: "cognidocs" },
    });

    const { result } = renderHook(() => useSEO());
    expect(result.current.url).toBe("https://timdehof.dev/projects?project=cognidocs");
  });

  it("returns page-specific SEO for other paths", () => {
    (useLocation as any).mockReturnValue({
      pathname: "/about",
      searchStr: "",
    });

    const { result } = renderHook(() => useSEO());
    expect(result.current.title).toBe("About Title");
  });

  it("merges custom SEO data", () => {
    const { result } = renderHook(() => useSEO({ title: "Custom Page" }));
    expect(result.current.title).toBe("Custom Page");
    expect(result.current.description).toBe("Default Description");
  });

  it("updates document title", () => {
    renderHook(() => useSEO({ title: "New Document Title" }));
    expect(document.title).toBe("New Document Title");
  });
});

describe("useSectionSEO", () => {
  beforeEach(() => {
    (useLocation as any).mockReturnValue({
      pathname: "/",
      searchStr: "",
    });
  });

  it("prefixes section name to the title", () => {
    const { result } = renderHook(() => useSectionSEO("Projects"));
    expect(result.current.title).toContain("Projects - ");
    expect(result.current.section).toBe("Projects");
  });
});
