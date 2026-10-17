import { QueryClientProvider } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it, vi } from "vitest";

import { queryClient } from "../../src/lib/query-client";
import { routeTree } from "../../src/routeTree.gen";
import { githubAPI } from "../../src/services/api/github";

vi.mock("../../src/components/layout/navbar", () => ({ Navbar: () => null }));
vi.mock("../../src/components/layout/footer", () => ({ Footer: () => null }));
vi.mock("../../src/services/api/github", () => ({
  githubAPI: {
    fetchContents: vi.fn(async (_owner: string, _repo: string, path: string) => {
      if (path === "cognidocs.json") {
        return { number: "02", name: "CogniDocs", tagline: "Document Q&A", description: "", useCase: "", image: "", accentColor: "#3568e8", techStack: [], advancedFeatures: [], resumePitch: "", tags: [], difficulty: "Advanced", timeEstimate: "4 weeks" };
      }
      throw new Error(`404: ${path}`);
    }),
  },
}));

describe("project detail page data", () => {
  it("does not request a case study for a project without one", async () => {
    const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: ["/projects/cognidocs"] }) });
    render(
      <QueryClientProvider client={queryClient}>
        <HelmetProvider><RouterProvider router={router} /></HelmetProvider>
      </QueryClientProvider>,
    );

    expect(await screen.findByRole("heading", { level: 1, name: "CogniDocs" })).toBeInTheDocument();
    const paths = vi.mocked(githubAPI.fetchContents).mock.calls.map(call => call[2]);
    expect(paths).not.toContain("cognidocs-case-study.json");
  });
});
