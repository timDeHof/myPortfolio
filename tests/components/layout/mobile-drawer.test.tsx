import { createMemoryHistory, createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from "@tanstack/react-router";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { Navbar } from "../../../src/components/layout/navbar";
import { DEFAULT_NAV_ITEMS } from "../../../src/lib/constants";

// Without portfolio data the navbar falls back to DEFAULT_NAV_ITEMS
vi.mock("../../../src/hooks/use-portfolio-data", () => ({ usePortfolioData: () => ({ data: undefined }) }));

function renderNavbar() {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
  });
  const pages = DEFAULT_NAV_ITEMS.map(item => createRoute({
    getParentRoute: () => rootRoute,
    path: item.href,
    component: () => <h1>{`${item.name} page`}</h1>,
  }));
  const router = createRouter({
    routeTree: rootRoute.addChildren(pages),
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  render(<RouterProvider router={router} />);
}

async function openDrawer(): Promise<HTMLElement> {
  fireEvent.click(await screen.findByRole("button", { name: "Open menu" }));
  return screen.getByRole("dialog", { name: "Mobile navigation" });
}

describe("mobile drawer", () => {
  it("opens from the menu button", async () => {
    renderNavbar();
    expect(await screen.findByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await openDrawer();

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "true");
  });

  // aria-controls tells screen readers which element the button opens
  it("names the drawer it opens in the menu button's aria-controls", async () => {
    renderNavbar();
    const drawer = await openDrawer();

    expect(drawer.id).not.toBe("");
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-controls", drawer.id);
  });

  it("lists every route in order", async () => {
    renderNavbar();
    const drawer = await openDrawer();
    const links = within(within(drawer).getByRole("navigation")).getAllByRole("link");

    expect(links.map(link => link.getAttribute("href"))).toEqual(DEFAULT_NAV_ITEMS.map(item => item.href));
    links.forEach((link, index) => expect(link).toHaveTextContent(DEFAULT_NAV_ITEMS[index].name));
  });

  it("closes and navigates when a link is tapped", async () => {
    renderNavbar();
    const drawer = await openDrawer();

    fireEvent.click(within(within(drawer).getByRole("navigation")).getByRole("link", { name: /Projects/ }));

    expect(await screen.findByRole("heading", { name: "Projects page" })).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on Escape", async () => {
    renderNavbar();
    await openDrawer();

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  // Otherwise keyboard focus falls back to the page body
  it("returns focus to the menu button when it closes", async () => {
    renderNavbar();
    await openDrawer();
    expect(screen.getByRole("dialog")).toContainElement(document.activeElement as HTMLElement);

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });
});
