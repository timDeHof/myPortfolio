import { useQuery } from '@tanstack/react-query';
import { githubAPI, githubKeys, GitHubRepository } from '../../services/api/github';

interface UseGitHubRepositoriesOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
}

export const useGitHubRepositories = (options: UseGitHubRepositoriesOptions = {}) => {
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
      // Additional client-side filtering or sorting can go here
      console.log('🔄 TanStack Query: Processing repositories data:', data.length);
      return data;
    },
    meta: {
      errorMessage: 'Failed to fetch GitHub repositories'
    }
  });
};

export const useGitHubUser = () => {
  return useQuery({
    queryKey: githubKeys.user(),
    queryFn: githubAPI.fetchUser,
    staleTime: 10 * 60 * 1000, // 10 minutes
    meta: {
      errorMessage: 'Failed to fetch GitHub user data'
    }
  });
};

export const useGitHubRepositoryLanguages = (languagesUrl: string, enabled = true) => {
  return useQuery({
    queryKey: [...githubKeys.all, 'languages', languagesUrl],
    queryFn: () => githubAPI.fetchRepositoryLanguages(languagesUrl),
    enabled: enabled && !!languagesUrl,
    staleTime: 15 * 60 * 1000, // 15 minutes
    meta: {
      errorMessage: 'Failed to fetch repository languages'
    }
  });
};

export const useGitHubRateLimit = () => {
  return useQuery({
    queryKey: githubKeys.rateLimit(),
    queryFn: githubAPI.fetchRateLimit,
    refetchInterval: 60 * 1000, // Refetch every minute
    meta: {
      errorMessage: 'Failed to fetch GitHub rate limit'
    }
  });
};