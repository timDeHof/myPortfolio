import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it, vi } from "vitest";

import { routeTree } from "../../src/routeTree.gen";

vi.mock("../../src/components/layout/navbar", () => ({ Navbar: () => null }));
vi.mock("../../src/components/layout/footer", () => ({ Footer: () => null }));
vi.mock("../../src/components/github/github-stats-section", () => ({ GitHubStatsSection: () => null }));
vi.mock("../../src/pages/project-detail-page", () => ({ ProjectDetailPage: () => <p>project detail</p> }));
vi.mock("../../src/hooks/use-projects", () => ({
  fetchAllProjects: async () => [{
    slug: "cognidocs",
    number: "02",
    name: "CogniDocs",
    tagline: "Document Q&A",
    description: "Description",
    useCase: "",
    image: "",
    accentColor: "#3568e8",
    techStack: ["React"],
    advancedFeatures: [],
    resumePitch: "",
    tags: [],
    difficulty: "Advanced",
    timeEstimate: "4 weeks",
    workflow: "",
    source: "project-json",
  }],
  projectQuery: (slug: string) => ({ queryKey: ["project", slug], queryFn: async () => null }),
  useProject: () => ({ data: undefined, isLoading: false }),
}));

function renderAt(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  render(<HelmetProvider><RouterProvider router={router} /></HelmetProvider>);
  return router;
}

describe("projects list links", () => {
  it("links each project card to its /projects/$slug page", async () => {
    renderAt("/projects");

    const link = await screen.findByRole("link", { name: /view details/i });
    expect(link).toHaveAttribute("href", "/projects/cognidocs");
  });

  it("redirects the old ?project=<slug> modal URL to /projects/<slug>", async () => {
    const router = renderAt("/projects?project=cognidocs");

    await waitFor(() => expect(router.state.location.pathname).toBe("/projects/cognidocs"));
    expect(await screen.findByText("project detail")).toBeInTheDocument();
  });
});
