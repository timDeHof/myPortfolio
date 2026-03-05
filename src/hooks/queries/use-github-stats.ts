import { useQuery } from "@tanstack/react-query";

import { githubStatsAPI, githubStatsKeys } from "../../services/api/github-stats";

export function useGitHubStats() {
  return useQuery({
    queryKey: githubStatsKeys.stats(),
    queryFn: githubStatsAPI.fetchGitHubStats,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    meta: {
      errorMessage: "Failed to fetch GitHub statistics",
    },
  });
}

export function useGitHubContributions(username: string = "timDeHof") {
  return useQuery({
    queryKey: githubStatsKeys.contributions(username),
    queryFn: () => githubStatsAPI.fetchContributions(username),
    staleTime: 60 * 60 * 1000, // 1 hour - same as Next.js unstable_cache revalidate
    gcTime: 24 * 60 * 60 * 1000, // 24 hours (cache garbage collection)
    meta: {
      errorMessage: "Failed to fetch contribution calendar",
    },
  });
}
