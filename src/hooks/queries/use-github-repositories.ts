import { useQuery, useQueries } from "@tanstack/react-query";

import type { GitHubRepository } from "../../services/api/github";

import { githubAPI, githubKeys } from "../../services/api/github";

type UseGitHubRepositoriesOptions = {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
};

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

export function useGitHubUser() {
  return useQuery({
    queryKey: githubKeys.user(),
    queryFn: githubAPI.fetchUser,
    staleTime: 10 * 60 * 1000, // 10 minutes
    meta: {
      errorMessage: "Failed to fetch GitHub user data",
    },
  });
}

export function useGitHubRepositoryLanguages(languagesUrl: string, enabled = true) {
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

export function useGitHubRepositoriesLanguages(repositories: GitHubRepository[] | undefined) {
  const languageUrls = repositories?.map(repo => repo.languages_url) ?? [];

  return useQueries({
    queries: languageUrls.map(url => ({
      queryKey: ['languages', url],
      queryFn: () => githubAPI.fetchRepositoryLanguages(url),
      staleTime: 15 * 60 * 1000, // 15 minutes
      enabled: !!repositories,
    })),
  });
}

export function useGitHubRateLimit() {
  return useQuery({
    queryKey: githubKeys.rateLimit(),
    queryFn: githubAPI.fetchRateLimit,
    refetchInterval: 60 * 1000, // Refetch every minute
    meta: {
      errorMessage: "Failed to fetch GitHub rate limit",
    },
  });
}
