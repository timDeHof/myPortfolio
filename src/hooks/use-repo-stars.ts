import { queryOptions, useQuery } from "@tanstack/react-query";

import { githubAPI } from "@/services/api/github";

// shadcn-timeline's star count for the home page (D3). The home route loader
// fills it before render, so the prerendered HTML carries the number.
export const shadcnTimelineStarsQuery = queryOptions({
  queryKey: ["github", "repository", "timDeHof", "shadcn-timeline"],
  queryFn: async () => (await githubAPI.fetchRepository("timDeHof", "shadcn-timeline")).stargazers_count,
  staleTime: 1000 * 60 * 60,
  // The page has a fallback (D17), so a failed fetch must not fail the prerender
  meta: { optional: true },
});

/** The star count, or undefined while loading or when GitHub could not be reached */
export function useShadcnTimelineStars(): number | undefined {
  return useQuery(shadcnTimelineStarsQuery).data;
}
