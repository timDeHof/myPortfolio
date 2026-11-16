import { queryOptions, useQuery } from "@tanstack/react-query";

import { retryDuringPrerender } from "@/lib/query-client";
import { githubAPI } from "@/services/api/github";

/** How long the star count may take before the page shows its "Open source" fallback */
export const STAR_COUNT_TIMEOUT_MS = 3000;

// shadcn-timeline's star count for the home page (D3). The home route loader
// fills it before render, so the prerendered HTML carries the number.
export const shadcnTimelineStarsQuery = queryOptions({
  queryKey: ["github", "repository", "timDeHof", "shadcn-timeline"],
  queryFn: async ({ signal }) => {
    // Abort the request if the query is cancelled or GitHub stalls
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(new Error(`Star count timed out after ${STAR_COUNT_TIMEOUT_MS}ms`)), STAR_COUNT_TIMEOUT_MS);
    const abortWithQuery = (): void => controller.abort(signal.reason);
    signal.addEventListener("abort", abortWithQuery, { once: true });
    try {
      return (await githubAPI.fetchRepository("timDeHof", "shadcn-timeline", controller.signal)).stargazers_count;
    }
    finally {
      clearTimeout(timer);
      signal.removeEventListener("abort", abortWithQuery);
    }
  },
  staleTime: 1000 * 60 * 60,
  // One attempt in the browser, so a slow or failed GitHub shows the fallback
  // without waiting on retries. The prerender retries, so one slow request
  // during the build doesn't publish the fallback.
  retry: retryDuringPrerender,
  // The page has a fallback (D17), so a failed fetch must not fail the prerender
  meta: { optional: true },
});

/** The star count, or undefined while loading or when GitHub could not be reached */
export function useShadcnTimelineStars(): number | undefined {
  return useQuery(shadcnTimelineStarsQuery).data;
}
