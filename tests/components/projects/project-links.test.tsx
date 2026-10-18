import { createMemoryHistory, createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import type { Project } from "../../../src/types/project";

import ProjectLinks from "../../../src/components/projects/project-links";

const project = { slug: "cognidocs", name: "CogniDocs" } as Project;

describe("project links", () => {
  it("preloads the project page when 'Read more' is hovered", async () => {
    const loader = vi.fn();
    const rootRoute = createRootRoute();
    const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: () => <ProjectLinks project={project} /> });
    const projectRoute = createRoute({ getParentRoute: () => rootRoute, path: "/projects/$slug", loader });
    const router = createRouter({
      routeTree: rootRoute.addChildren([indexRoute, projectRoute]),
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });
    render(<RouterProvider router={router} />);

    fireEvent.mouseEnter(await screen.findByRole("link", { name: "Read more" }));

    await waitFor(() => expect(loader).toHaveBeenCalledWith(expect.objectContaining({ params: { slug: "cognidocs" } })));
  });
});
