import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Story from "../../src/components/about/sections/story.section";
import Background from "../../src/components/home/sections/background.section";

async function timelineYears(name: string): Promise<string[]> {
  const list = await screen.findByRole("list", { name });
  return within(list).getAllByRole("listitem").map(item => item.querySelector("span")?.textContent ?? "");
}

describe("career timeline", () => {
  it("shows the home rows with the same dates and order as the About timeline", async () => {
    const router = createRouter({
      routeTree: createRootRoute({ component: () => (
        <>
          <Background />
          <Story />
        </>
      ) }),
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });
    render(<RouterProvider router={router} />);

    const home = await timelineYears("Short timeline");
    const about = await timelineYears("Career timeline");

    expect(home).toHaveLength(4);
    expect(home).toEqual(about.filter(years => home.includes(years)));
  });
});
