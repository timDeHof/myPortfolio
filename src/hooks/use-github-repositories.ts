import { useEffect, useState } from "react";

import type { GitHubRepository } from "../services/github-service";

import { fetchGitHubRepositories } from "../services/github-service";

type UseGitHubRepositoriesReturn = {
  repositories: GitHubRepository[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useGitHubRepositories(): UseGitHubRepositoriesReturn {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      setError(null);

      const repos = await fetchGitHubRepositories();

      setRepositories(repos);

      if (repos.length === 0) {
        console.warn("⚠️ useGitHubRepositories: No repositories returned from GitHub API");
        setError("No public repositories found. This might be due to API rate limiting or all repositories being private.");
      }
    }
    catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch repositories";
      console.error("💥 useGitHubRepositories error:", err);
      setError(errorMessage);
      // Don't clear repositories on error - keep any existing data
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return {
    repositories,
    loading,
    error,
    refetch: fetchRepositories,
  };
}
