import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SelectedWork from "../../../src/components/home/sections/selected-work.section";
import { CASE_STUDY_SLUGS } from "../../../src/types/project";

function renderSelectedWork() {
  const router = createRouter({
    routeTree: createRootRoute({ component: () => <SelectedWork stars={317} /> }),
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  render(<RouterProvider router={router} />);
}

describe("selected work", () => {
  it("labels a link 'Case study' only when the project has one", async () => {
    renderSelectedWork();

    const links = await screen.findAllByRole("link", { name: "Case study" });
    const slugs = links.map(link => link.getAttribute("href")?.replace("/projects/", ""));

    expect(slugs.length).toBeGreaterThan(0);
    for (const slug of slugs) {
      expect(CASE_STUDY_SLUGS).toContain(slug);
    }
  });

  it("labels the other project links 'Details'", async () => {
    renderSelectedWork();

    const links = await screen.findAllByRole("link", { name: "Details" });

    expect(links.map(link => link.getAttribute("href"))).toEqual(["/projects/teamforward"]);
  });
});
