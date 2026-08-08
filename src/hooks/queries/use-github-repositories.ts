import { useQueries, useQuery } from "@tanstack/react-query";

import type { GitHubRepository } from "../../services/api/github";

import { githubAPI, githubKeys } from "../../services/api/github";

interface UseGitHubRepositoriesOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

export function useGitHubRepositories(options: UseGitHubRepositoriesOptions = {}) {
  const {
    enabled = true,
    refetchOnWindowFocus = false,
  } = options;

  return useQuery({
    queryKey: githubKeys.repositories(),
    queryFn: githubAPI.fetchRepositories,
    enabled,
    refetchOnWindowFocus,
    select: (data: GitHubRepository[]) => {
      return data;
    },
    meta: {
      errorMessage: "Failed to fetch GitHub repositories",
    },
  });
}

/**
 * Creates parallel queries to fetch languages for each repository in the provided list.
 *
 * @param repositories - Array of GitHub repositories; if `undefined`, queries are disabled.
 * @returns An array of React Query result objects, one per repository language URL. Each query fetches that repository's languages, is disabled when `repositories` is `undefined`, and uses a 15-minute stale time.
 */
export function useGitHubRepositoriesLanguages(repositories: GitHubRepository[] | undefined) {
  const languageUrls = repositories?.map(repo => repo.languages_url) ?? [];

  return useQueries({
    queries: languageUrls.map(url => ({
      queryKey: [...githubKeys.all, "languages", url],
      queryFn: () => githubAPI.fetchRepositoryLanguages(url),
      staleTime: 15 * 60 * 1000, // 15 minutes
      enabled: !!repositories,
    })),
  });
}
