import { hydrate, QueryClient } from "@tanstack/react-query";

import { GitHubAPIError } from "../types/github";

function shouldRetry(failureCount: number, error: Error): boolean {
  // Don't retry a missing file. GitHub's 404 message is "Not Found", so
  // check the status rather than only the message.
  if (error instanceof GitHubAPIError && error.status === 404) {
    return false;
  }
  if (error.message.includes("404")) {
    return false;
  }
  // Retry up to 3 times for other errors
  return failureCount < 3;
}

/**
 * For queries the page can render without: retry during the prerender, where a
 * failure fails the build or publishes the page without its data, and make one
 * attempt in the browser, where a retry holds the page back.
 */
export const retryDuringPrerender = typeof window === "undefined" ? shouldRetry : false;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: shouldRetry,
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
  if (!json) {
    return;
  }
  try {
    hydrate(queryClient, JSON.parse(json));
  }
  catch (error) {
    // The queries refetch in the browser, so a bad script only costs the head start
    console.warn("Ignoring malformed prerendered query state", error);
  }
}
