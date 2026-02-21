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

function useGitHubUser() {
  return useQuery({
    queryKey: githubKeys.user(),
    queryFn: githubAPI.fetchUser,
    staleTime: 10 * 60 * 1000, // 10 minutes
    meta: {
      errorMessage: "Failed to fetch GitHub user data",
    },
  });
}

/**
 * Fetches the programming languages used in a repository identified by a languages URL.
 *
 * @param languagesUrl - The repository's languages API URL; when falsy the query is disabled.
 * @param enabled - Whether the query should be allowed to run (defaults to `true`).
 * @returns An object representing the query result; `data` is a record mapping language names to byte counts, with standard status and error fields from React Query.
 */
function useGitHubRepositoryLanguages(languagesUrl: string, enabled = true) {
  return useQuery({
    queryKey: [...githubKeys.all, "languages", languagesUrl],
    queryFn: () => githubAPI.fetchRepositoryLanguages(languagesUrl),
    enabled: enabled && !!languagesUrl,
    staleTime: 15 * 60 * 1000, // 15 minutes
    meta: {
      errorMessage: "Failed to fetch repository languages",
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

/**
 * Fetches GitHub API rate limit information and refreshes it every minute.
 *
 * @returns A React Query result containing the GitHub rate limit data, status flags, and query controls.
 */
function useGitHubRateLimit() {
  return useQuery({
    queryKey: githubKeys.rateLimit(),
    queryFn: githubAPI.fetchRateLimit,
    refetchInterval: 60 * 1000, // Refetch every minute
    meta: {
      errorMessage: "Failed to fetch GitHub rate limit",
    },
  });
}
