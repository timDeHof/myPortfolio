import { hydrate, QueryClient } from "@tanstack/react-query";

import { GitHubAPIError } from "../types/github";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: (failureCount, error) => {
        // Don't retry a missing file. GitHub's 404 message is "Not Found", so
        // check the status rather than only the message.
        if (error instanceof GitHubAPIError && error.status === 404) {
          return false;
        }
        if (error instanceof Error && error.message.includes("404")) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});

/** The id of the script tag the prerender writes the dehydrated query state into */
export const QUERY_STATE_ELEMENT_ID = "query-state";

/** Load the query state the prerender wrote into the page, so the first render matches the HTML */
export function hydrateFromPrerender(): void {
  const json = document.getElementById(QUERY_STATE_ELEMENT_ID)?.textContent;
  if (json) {
    hydrate(queryClient, JSON.parse(json));
  }
}
