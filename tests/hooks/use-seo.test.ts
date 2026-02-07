import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useSEO, useSectionSEO } from "../../src/hooks/use-seo";
import { useLocation } from "react-router-dom";

// Mock react-router-dom
vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(),
}));

// Mock SEO utils
vi.mock("../../src/utils/seo", () => ({
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
      search: "",
    });
    
    // Mock window.location.origin
    Object.defineProperty(window, 'location', {
      value: { origin: "http://localhost" },
      writable: true
    });
  });

  it("returns home SEO for root path", () => {
    const { result } = renderHook(() => useSEO());
    expect(result.current.title).toBe("Home Title");
    expect(result.current.url).toBe("http://localhost/");
  });

  it("returns page-specific SEO for other paths", () => {
    (useLocation as any).mockReturnValue({
      pathname: "/about",
      search: "",
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
      search: "",
    });
  });

  it("prefixes section name to the title", () => {
    const { result } = renderHook(() => useSectionSEO("Projects"));
    expect(result.current.title).toContain("Projects - ");
    expect(result.current.section).toBe("Projects");
  });
});
