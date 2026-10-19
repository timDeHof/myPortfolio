import type { ReactElement } from "react";
import type { HelmetServerState } from "react-helmet-async";

import { dehydrate, hashKey } from "@tanstack/react-query";
import { createMemoryHistory } from "@tanstack/react-router";
import { StrictMode } from "react";
import { prerender } from "react-dom/static.edge";

import App, { createAppRouter } from "./App";
import { shadcnTimelineStarsQuery } from "./hooks/use-repo-stars";
import { QUERY_STATE_ELEMENT_ID, queryClient } from "./lib/query-client";
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

// The browser starts with an empty query cache, so without this the first
// render replaces the prerendered star count with its "Open source" fallback.
// Only the star count is passed on, to keep the HTML small.
function dehydratedQueryState(): HeadElement | undefined {
  const state = dehydrate(queryClient, {
    shouldDehydrateQuery: query => query.state.status === "success" && hashKey(query.queryKey) === hashKey(shadcnTimelineStarsQuery.queryKey),
  });
  if (state.queries.length === 0) {
    return undefined;
  }
  // Escape "<" so the JSON cannot close the script tag
  return { type: "script", props: { type: "application/json", id: QUERY_STATE_ELEMENT_ID, children: JSON.stringify(state).replace(/</g, "\\u003c") } };
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
  // published as a "not found" page. Queries marked optional have a fallback.
  const failed = queryClient.getQueryCache().getAll().filter(query => query.state.status === "error" && !query.meta?.optional);
  const queryState = dehydratedQueryState();
  // Drop cached queries so their gcTime timers do not keep the build process alive
  queryClient.clear();
  if (failed.length > 0) {
    throw new Error(`Prerender of ${url} failed to load ${failed.map(query => JSON.stringify(query.queryKey)).join(", ")}`);
  }
  const helmet = helmetContext.helmet;
  const elements = helmet ? toHeadElements(helmet) : new Set<HeadElement>();
  if (queryState) {
    elements.add(queryState);
  }

  return {
    html,
    links: new Set<string>(),
    head: { lang: "en", title: helmet ? toTitle(helmet) : undefined, elements },
  };
}
