import { useQuery } from '@tanstack/react-query';
import { githubStatsAPI, githubStatsKeys } from '../../services/api/githubStats';

export const useGitHubStats = () => {
  return useQuery({
    queryKey: githubStatsKeys.stats(),
    queryFn: githubStatsAPI.fetchGitHubStats,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    meta: {
      errorMessage: 'Failed to fetch GitHub statistics'
    }
  });
};

export const useGitHubContributions = () => {
  return useQuery({
    queryKey: githubStatsKeys.contributions(),
    queryFn: githubStatsAPI.generateContributionCalendar,
    staleTime: 60 * 60 * 1000, // 1 hour
    meta: {
      errorMessage: 'Failed to generate contribution calendar'
    }
  });
};