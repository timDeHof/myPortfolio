import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen, waitFor, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { afterEach, describe, expect, it, vi } from "vitest";

import { queryClient } from "../../src/lib/query-client";
import { routeTree } from "../../src/routeTree.gen";

// The projects whose download succeeds. Every other slug fails.
const { served } = vi.hoisted(() => ({ served: new Set<string>() }));

function project(slug: string, name: string) {
  return {
    slug,
    number: "02",
    name,
    tagline: `${name} tagline`,
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
  };
}

const names: Record<string, string> = {
  "shadcn-timeline": "shadcn-timeline",
  "teamforward": "TeamForward",
  "cognidocs": "CogniDocs",
  "habitgate-mobile": "HabitGate",
};

vi.mock("../../src/components/layout/navbar", () => ({ Navbar: () => null }));
vi.mock("../../src/components/layout/footer", () => ({ Footer: () => null }));
vi.mock("../../src/components/github/github-stats-section", () => ({ GitHubStatsSection: () => null }));
vi.mock("../../src/pages/project-detail-page", () => ({ ProjectDetailPage: () => <p>project detail</p> }));
vi.mock("../../src/hooks/use-projects", () => ({
  projectQuery: (slug: string) => ({
    queryKey: ["project", slug],
    queryFn: async () => {
      if (!served.has(slug)) {
        throw new Error(`404: ${slug}`);
      }
      return project(slug, names[slug]);
    },
    retry: false,
  }),
  useProject: () => ({ data: undefined, isLoading: false }),
}));

afterEach(() => {
  served.clear();
  queryClient.clear();
});

function serve(...slugs: string[]) {
  slugs.forEach(slug => served.add(slug));
}

function renderAt(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  render(<HelmetProvider><RouterProvider router={router} /></HelmetProvider>);
  return router;
}

describe("projects list links", () => {
  it("links each project to its /projects/$slug page", async () => {
    serve("cognidocs");
    renderAt("/projects");

    const link = await screen.findByRole("link", { name: /read more/i });
    expect(link).toHaveAttribute("href", "/projects/cognidocs");
  });

  it("redirects the old ?project=<slug> modal URL to /projects/<slug>", async () => {
    serve("cognidocs");
    const router = renderAt("/projects?project=cognidocs");

    await waitFor(() => expect(router.state.location.pathname).toBe("/projects/cognidocs"));
    expect(await screen.findByText("project detail")).toBeInTheDocument();
  });
});

// The prerender fails the build when a download fails, so these cases only
// happen in the browser
describe("when some project downloads fail in the browser", () => {
  it("counts one project in the singular", async () => {
    serve("shadcn-timeline");
    renderAt("/projects");

    expect(await screen.findByText("1 project")).toBeInTheDocument();
    expect(screen.queryByText("1 projects")).not.toBeInTheDocument();
  });

  // The intro says the first is the one to walk through, so another project
  // must not take shadcn-timeline's place
  it("doesn't promote another project to the lead when the lead fails", async () => {
    serve("teamforward", "cognidocs", "habitgate-mobile");
    renderAt("/projects");

    const index = await screen.findByRole("list", { name: "More projects" });
    expect(within(index).getByRole("heading", { name: "TeamForward" })).toBeInTheDocument();
    expect(screen.queryByLabelText("TeamForward title block")).not.toBeInTheDocument();
    // With no lead, "the first" would point at an index row
    expect(document.body.textContent).not.toContain("walk through in an interview");
    expect(document.body.textContent).toContain("Each project lists the problem, my role, and the stack.");
  });

  it("says the projects didn't load, not that there are none, when every download fails", async () => {
    renderAt("/projects");

    expect(await screen.findByText("Projects didn't load. They're also on GitHub.")).toBeInTheDocument();
    // Same accent colors as the More on GitHub and footer Get In Touch buttons
    expect(screen.getByRole("link", { name: /GitHub profile/ })).toHaveClass("btn--accent");
    expect(document.body.textContent).not.toContain("No projects found");
  });
});
