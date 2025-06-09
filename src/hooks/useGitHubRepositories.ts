import { useState, useEffect } from 'react';
import { GitHubRepository, fetchGitHubRepositories, debugGitHubAPI } from '../services/githubService';

interface UseGitHubRepositoriesReturn {
  repositories: GitHubRepository[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGitHubRepositories = (): UseGitHubRepositoriesReturn => {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🎯 useGitHubRepositories: Starting fetch...');
      
      // Run debug function in development
      if (import.meta.env.DEV) {
        await debugGitHubAPI();
      }
      
      const repos = await fetchGitHubRepositories();
      console.log('✅ useGitHubRepositories: Successfully fetched', repos.length, 'repositories');
      
      // Log the repositories we're about to set
      console.log('📋 Setting repositories:', repos.map(r => ({ name: r.name, stars: r.stargazers_count })));
      
      setRepositories(repos);
      
      if (repos.length === 0) {
        console.warn('⚠️ useGitHubRepositories: No repositories returned from GitHub API');
        setError('No public repositories found. This might be due to API rate limiting or all repositories being private.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch repositories';
      console.error('💥 useGitHubRepositories error:', err);
      setError(errorMessage);
      // Don't clear repositories on error - keep any existing data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 useGitHubRepositories: Initial mount, fetching repositories...');
    fetchRepositories();
  }, []);

  // Debug log whenever repositories state changes
  useEffect(() => {
    console.log('🔄 useGitHubRepositories: Repositories state updated:', {
      count: repositories.length,
      loading,
      error,
      repos: repositories.map(r => r.name)
    });
  }, [repositories, loading, error]);

  return {
    repositories,
    loading,
    error,
    refetch: fetchRepositories,
  };
};