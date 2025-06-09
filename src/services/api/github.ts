import { queryClient } from '../../lib/queryClient';

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  archived: boolean;
  fork: boolean;
  private: boolean;
}

export interface GitHubLanguages {
  [language: string]: number;
}

export interface GitHubUser {
  login: string;
  id: number;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubError {
  message: string;
  status: number;
  url: string;
}

const GITHUB_USERNAME = 'timDeHof';
const GITHUB_API_BASE = 'https://api.github.com';

// Enhanced error class for better error handling
export class GitHubAPIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public url: string,
    message?: string
  ) {
    super(message || `GitHub API Error: ${status} ${statusText}`);
    this.name = 'GitHubAPIError';
  }
}

// Helper function to get authentication headers
const getAuthHeaders = (): HeadersInit => {
  const token = import.meta.env.VITE_GITHUB_PAT;
  
  const baseHeaders = {
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'Portfolio-App/1.0.0'
  };

  if (token && token !== 'your_github_personal_access_token_here') {
    return {
      ...baseHeaders,
      'Authorization': `Bearer ${token}`,
    };
  }
  
  return baseHeaders;
};

// Enhanced fetch wrapper with better error handling
const githubFetch = async <T>(url: string): Promise<T> => {
  console.log(`🚀 GitHub API Request: ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });

    // Log response details
    console.log(`📡 Response Status: ${response.status} ${response.statusText}`);
    console.log('📋 Rate Limit Remaining:', response.headers.get('x-ratelimit-remaining'));
    console.log('📋 Rate Limit Reset:', response.headers.get('x-ratelimit-reset'));

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ GitHub API Error Response:`, errorText);
      
      let errorMessage = `GitHub API error: ${response.status} ${response.statusText}`;
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If we can't parse the error as JSON, use the raw text
        errorMessage = errorText || errorMessage;
      }

      throw new GitHubAPIError(response.status, response.statusText, url, errorMessage);
    }

    const data = await response.json();
    console.log(`✅ GitHub API Success: Received data from ${url}`);
    return data;
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    
    console.error(`💥 GitHub API Network Error:`, error);
    throw new GitHubAPIError(0, 'Network Error', url, 
      error instanceof Error ? error.message : 'Unknown network error'
    );
  }
};

// API Functions
export const githubAPI = {
  // Fetch user information
  fetchUser: async (): Promise<GitHubUser> => {
    return githubFetch<GitHubUser>(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
  },

  // Fetch repositories with enhanced filtering
  fetchRepositories: async (): Promise<GitHubRepository[]> => {
    const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=all`;
    const repositories = await githubFetch<GitHubRepository[]>(url);
    
    console.log('📊 Total repositories fetched:', repositories.length);
    
    // Apply filtering for public, non-archived repositories
    const filteredRepos = repositories
      .filter(repo => {
        const isPublic = !repo.private;
        const isNotArchived = !repo.archived;
        
        if (!isPublic) {
          console.log(`🔒 Filtering out private repo: ${repo.name}`);
        }
        if (!isNotArchived) {
          console.log(`📦 Filtering out archived repo: ${repo.name}`);
        }
        
        return isPublic && isNotArchived;
      })
      .sort((a, b) => {
        // Sort by stars first, then by last updated
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });

    console.log('✅ Filtered repositories count:', filteredRepos.length);
    return filteredRepos;
  },

  // Fetch repository languages
  fetchRepositoryLanguages: async (languagesUrl: string): Promise<GitHubLanguages> => {
    try {
      return await githubFetch<GitHubLanguages>(languagesUrl);
    } catch (error) {
      console.warn(`⚠️ Failed to fetch languages for ${languagesUrl}:`, error);
      return {};
    }
  },

  // Fetch rate limit information
  fetchRateLimit: async () => {
    return githubFetch(`${GITHUB_API_BASE}/rate_limit`);
  }
};

// Query Keys - Centralized for easy cache management
export const githubKeys = {
  all: ['github'] as const,
  user: () => [...githubKeys.all, 'user', GITHUB_USERNAME] as const,
  repositories: () => [...githubKeys.all, 'repositories', GITHUB_USERNAME] as const,
  languages: (repoName: string) => [...githubKeys.all, 'languages', GITHUB_USERNAME, repoName] as const,
  rateLimit: () => [...githubKeys.all, 'rateLimit'] as const,
};

// Cache management utilities
export const githubCache = {
  // Invalidate all GitHub data
  invalidateAll: () => {
    return queryClient.invalidateQueries({ queryKey: githubKeys.all });
  },
  
  // Invalidate repositories
  invalidateRepositories: () => {
    return queryClient.invalidateQueries({ queryKey: githubKeys.repositories() });
  },
  
  // Prefetch repositories
  prefetchRepositories: () => {
    return queryClient.prefetchQuery({
      queryKey: githubKeys.repositories(),
      queryFn: githubAPI.fetchRepositories,
    });
  },
  
  // Get cached repositories
  getCachedRepositories: (): GitHubRepository[] | undefined => {
    return queryClient.getQueryData(githubKeys.repositories());
  }
};

// Utility functions
export const getTopLanguages = (languages: GitHubLanguages): string[] => {
  const sortedLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .map(([language]) => language);
  
  return sortedLanguages.slice(0, 3);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getRepositoryImage = (repoName: string): string => {
  const imageMap: { [key: string]: string } = {
    'galactic-pawn': '/galactic-pawn-project-image.png',
    'facerecognitionbrain': '/movie-watchlist-project-image.png',
    'crwn-clothing': '/movie-watchlist-project-image-1.png',
    'movie-watchlist': '/movie-watchlist-project-image-2.png',
    'monsters-rolodex': '/monster-rolodex-project-image.png',
    'passwordGenerator': '/password-generator-project-image.png',
  };

  return imageMap[repoName] || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop&crop=entropy&auto=format&q=80`;
};