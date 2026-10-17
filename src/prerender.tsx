import type { ReactElement } from "react";
import type { HelmetServerState } from "react-helmet-async";

import { createMemoryHistory } from "@tanstack/react-router";
import { StrictMode } from "react";
import { prerender } from "react-dom/static.edge";

import App, { createAppRouter } from "./App";
import { queryClient } from "./lib/query-client";
import { SITE_URL } from "./utils/seo";

interface HeadElement {
  type: string;
  props: Record<string, unknown>;
}

// Helmet types toComponent() as a single component, but it returns an array of elements
function elementsOf(datum: { toComponent: () => unknown }): ReactElement[] {
  return datum.toComponent() as ReactElement[];
}

function toHeadElements(helmet: HelmetServerState): Set<HeadElement> {
  const elements = [...elementsOf(helmet.meta), ...elementsOf(helmet.link)];
  // The plugin writes every prop as an attribute string, so drop Helmet's
  // non-string bookkeeping props (e.g. the boolean `data-rh`)
  return new Set(elements.map(element => ({
    type: String(element.type),
    props: Object.fromEntries(
      Object.entries(element.props as Record<string, unknown>)
        .filter(([, value]) => typeof value === "string"),
    ),
  })));
}

function toTitle(helmet: HelmetServerState): string | undefined {
  const [title] = elementsOf(helmet.title);
  const children = (title?.props as { children?: unknown } | undefined)?.children;
  return Array.isArray(children) ? children.join("") : children as string | undefined;
}

export async function renderPage(url: string) {
  const router = createAppRouter({
    history: createMemoryHistory({ initialEntries: [url] }),
    origin: SITE_URL,
  });
  await router.load();

  const helmetContext: { helmet?: HelmetServerState } = {};
  const { prelude } = await prerender(
    <StrictMode>
      <App router={router} helmetContext={helmetContext} />
    </StrictMode>,
  );
  const html = await new Response(prelude).text();
  // Drop cached queries so their gcTime timers do not keep the build process alive
  queryClient.clear();
  const helmet = helmetContext.helmet;

  return {
    html,
    links: new Set<string>(),
    head: helmet
      ? { lang: "en", title: toTitle(helmet), elements: toHeadElements(helmet) }
      : { lang: "en" },
  };
}
