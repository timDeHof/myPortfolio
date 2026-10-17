import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { routeTree } from "../../src/routeTree.gen";

vi.mock("../../src/components/layout/navbar", () => ({ Navbar: () => null }));
vi.mock("../../src/components/layout/footer", () => ({ Footer: () => null }));
vi.mock("../../src/hooks/use-projects", () => ({ fetchAllProjects: async () => [] }));
vi.mock("../../src/pages/projects-page", () => ({ ProjectsPage: () => <p>projects list</p> }));
vi.mock("../../src/pages/project-detail-page", () => ({ ProjectDetailPage: () => <p>project detail</p> }));

function renderAt(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  render(<RouterProvider router={router} />);
}

describe("project routes", () => {
  it("renders the project detail page at /projects/$slug", async () => {
    renderAt("/projects/cognidocs");

    expect(await screen.findByText("project detail")).toBeInTheDocument();
    expect(screen.queryByText("projects list")).not.toBeInTheDocument();
  });

  it("renders the projects list at /projects", async () => {
    renderAt("/projects");

    expect(await screen.findByText("projects list")).toBeInTheDocument();
    expect(screen.queryByText("project detail")).not.toBeInTheDocument();
  });
});
