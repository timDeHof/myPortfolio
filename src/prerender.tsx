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
  const elements = [...elementsOf(helmet.meta), ...elementsOf(helmet.link), ...elementsOf(helmet.script)];
  return new Set(elements.map((element) => {
    const { dangerouslySetInnerHTML, ...rest } = element.props as Record<string, unknown> & { dangerouslySetInnerHTML?: { __html?: string } };
    // The plugin writes every prop as an attribute string. Helmet's boolean
    // `data-rh` marker becomes "true" so the client recognizes and replaces
    // these tags, and script contents (JSON-LD) become `children`.
    const props: Record<string, unknown> = Object.fromEntries(
      Object.entries(rest).flatMap(([key, value]) => {
        if (typeof value === "string")
          return [[key, value]];
        return value === true ? [[key, "true"]] : [];
      }),
    );
    if (dangerouslySetInnerHTML?.__html) {
      props.children = dangerouslySetInnerHTML.__html;
    }
    return { type: String(element.type), props };
  }));
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
  // Loaders swallow fetch errors so client navigation still renders, so a
  // failed download (outage, rate limit) is caught here instead of being
  // published as a "not found" page
  const failed = queryClient.getQueryCache().getAll().filter(query => query.state.status === "error");
  // Drop cached queries so their gcTime timers do not keep the build process alive
  queryClient.clear();
  if (failed.length > 0) {
    throw new Error(`Prerender of ${url} failed to load ${failed.map(query => JSON.stringify(query.queryKey)).join(", ")}`);
  }
  const helmet = helmetContext.helmet;

  return {
    html,
    links: new Set<string>(),
    head: helmet
      ? { lang: "en", title: toTitle(helmet), elements: toHeadElements(helmet) }
      : { lang: "en" },
  };
}
