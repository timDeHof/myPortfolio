import { env } from "../../lib/env";
import { queryClient } from "../../lib/query-client";

export type GitHubRepository = {
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
  category?: 'showcase' | 'personal' | 'contribution' | 'fork';
};

export type GitHubLanguages = {
  [language: string]: number;
};

export type GitHubUser = {
  createdAt: string;
  updated_at: string;
  location: string | undefined;
  blog: string | undefined;
  twitter_username: string | undefined;
  company: string | undefined;
  login: string;
  id: number;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
};

export type GitHubError = {
  message: string;
  status: number;
  url: string;
};

const GITHUB_USERNAME = "timDeHof";
const GITHUB_API_BASE = "https://api.github.com";

// Repositories to exclude from portfolio (add repo names here)
const EXCLUDED_REPOS = [
  'timDeHof', // Profile README repo
  'test-repo',
  'playground',
  'scratch',
  // Add any repo names you want to hide
];

// Enhanced error class for better error handling
export class GitHubAPIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public url: string,
    message?: string,
  ) {
    super(message || `GitHub API Error: ${status} ${statusText}`);
    this.name = "GitHubAPIError";
  }
}

// Helper function to get authentication headers
function getAuthHeaders(): HeadersInit {
  const token = env.VITE_GITHUB_PAT;

  const baseHeaders = {
    "Accept": "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "Portfolio-App/1.0.0",
  };

  if (token && token !== "your_github_personal_access_token_here") {
    return {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  return baseHeaders;
}

// Enhanced fetch wrapper with better error handling
async function githubFetch<T>(url: string): Promise<T> {
  console.log(`🚀 GitHub API Request: ${url}`);

  try {
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });

    // Log response details
    console.log(`📡 Response Status: ${response.status} ${response.statusText}`);
    console.log("📋 Rate Limit Remaining:", response.headers.get("x-ratelimit-remaining"));
    console.log("📋 Rate Limit Reset:", response.headers.get("x-ratelimit-reset"));

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ GitHub API Error Response:`, errorText);

      let errorMessage = `GitHub API error: ${response.status} ${response.statusText}`;

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      }
      catch {
        // If we can't parse the error as JSON, use the raw text
        errorMessage = errorText || errorMessage;
      }

      throw new GitHubAPIError(response.status, response.statusText, url, errorMessage);
    }

    const data = await response.json();
    console.log(`✅ GitHub API Success: Received data from ${url}`);
    return data;
  }
  catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }

    console.error(`💥 GitHub API Network Error:`, error);
    throw new GitHubAPIError(0, "Network Error", url, error instanceof Error ? error.message : "Unknown network error",
    );
  }
}

// API Functions
export const githubAPI = {
  // Fetch user information
  fetchUser: async (): Promise<GitHubUser> => {
    return githubFetch<GitHubUser>(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
  },

  // Fetch repositories with enhanced categorization
  fetchRepositories: async (): Promise<GitHubRepository[]> => {
    const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=all`;
    const repositories = await githubFetch<GitHubRepository[]>(url);

    console.log("📊 Total repositories fetched:", repositories.length);

    // Filter for public, non-archived, non-excluded repositories with demo links
    const publicRepos = repositories.filter((repo) => {
      const isPublic = !repo.private;
      const isNotArchived = !repo.archived;
      const isNotExcluded = !EXCLUDED_REPOS.includes(repo.name);
      const hasDemo = repo.homepage && repo.homepage.trim() !== "";

      if (!isPublic) console.log(`🔒 Filtering out private repo: ${repo.name}`);
      if (!isNotArchived) console.log(`📦 Filtering out archived repo: ${repo.name}`);
      if (!isNotExcluded) console.log(`🚫 Filtering out excluded repo: ${repo.name}`);
      if (!hasDemo) console.log(`🔗 Filtering out repo without demo: ${repo.name}`);

      return isPublic && isNotArchived && isNotExcluded && hasDemo;
    });

    // Categorize repositories
    const categorized = publicRepos.map(repo => ({
      ...repo,
      category: githubAPI.categorizeRepository(repo)
    }));

    // Sort by category priority, then by engagement
    return categorized.sort((a, b) => {
      const categoryPriority = { showcase: 0, personal: 1, contribution: 2, fork: 3 };
      const aPriority = categoryPriority[a.category];
      const bPriority = categoryPriority[b.category];
      
      if (aPriority !== bPriority) return aPriority - bPriority;
      
      // Within same category, sort by engagement (stars + forks)
      const aEngagement = a.stargazers_count + a.forks_count;
      const bEngagement = b.stargazers_count + b.forks_count;
      
      if (bEngagement !== aEngagement) return bEngagement - aEngagement;
      
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  },

  // Categorize repository based on various criteria
  categorizeRepository: (repo: GitHubRepository): 'showcase' | 'personal' | 'contribution' | 'fork' => {
    // Check for portfolio-ready topics
    const portfolioTopics = ['portfolio', 'showcase', 'featured', 'production', 'demo'];
    const hasPortfolioTopic = repo.topics?.some(topic => portfolioTopics.includes(topic.toLowerCase()));
    
    // Showcase projects: High-quality original projects worth highlighting
    const showcaseIndicators = [
      repo.stargazers_count > 0,
      repo.forks_count > 0,
      repo.description && repo.description.length > 20,
      repo.homepage,
      repo.topics && repo.topics.length > 2,
      hasPortfolioTopic // Bonus for portfolio topics
    ];
    
    const showcaseScore = showcaseIndicators.filter(Boolean).length;
    
    if (!repo.fork && (hasPortfolioTopic || showcaseScore >= 3)) {
      console.log(`⭐ Showcase project: ${repo.name} (score: ${showcaseScore}, portfolio topic: ${hasPortfolioTopic})`);
      return 'showcase';
    }
    
    // Personal projects: Original work but maybe not showcase-ready
    if (!repo.fork) {
      console.log(`👤 Personal project: ${repo.name}`);
      return 'personal';
    }
    
    // Contributions: Forks with meaningful changes
    const contributionIndicators = [
      repo.stargazers_count > 0,
      new Date(repo.pushed_at) > new Date(repo.created_at),
      repo.description && !repo.description.includes('fork')
    ];
    
    if (contributionIndicators.filter(Boolean).length >= 2) {
      console.log(`🤝 Contribution: ${repo.name}`);
      return 'contribution';
    }
    
    // Regular forks
    console.log(`🍴 Fork: ${repo.name}`);
    return 'fork';
  },

  // Fetch repository languages
  fetchRepositoryLanguages: async (languagesUrl: string): Promise<GitHubLanguages> => {
    try {
      return await githubFetch<GitHubLanguages>(languagesUrl);
    }
    catch (error) {
      console.warn(`⚠️ Failed to fetch languages for ${languagesUrl}:`, error);
      return {};
    }
  },

  // Fetch rate limit information
  fetchRateLimit: async () => {
    return githubFetch(`${GITHUB_API_BASE}/rate_limit`);
  },
};

// Query Keys - Centralized for easy cache management
export const githubKeys = {
  all: ["github"] as const,
  user: () => [...githubKeys.all, "user", GITHUB_USERNAME] as const,
  repositories: () => [...githubKeys.all, "repositories", GITHUB_USERNAME] as const,
  languages: (repoName: string) => [...githubKeys.all, "languages", GITHUB_USERNAME, repoName] as const,
  rateLimit: () => [...githubKeys.all, "rateLimit"] as const,
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
  },
};

// Utility functions
export function getTopLanguages(languages: GitHubLanguages): string[] {
  const sortedLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .map(([language]) => language);

  return sortedLanguages.slice(0, 3);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getRepositoryImage(repoName: string): string {
  const imageMap: { [key: string]: string } = {
    "galactic-pawn": "/galactic-pawn-project-image.png",
    "facerecognitionbrain": "/movie-watchlist-project-image.png",
    "crwn-clothing": "/movie-watchlist-project-image-1.png",
    "movie-watchlist": "/movie-watchlist-project-image-2.png",
    "monsters-rolodex": "/monster-rolodex-project-image.png",
    "passwordGenerator": "/password-generator-project-image.png",
  };

  return imageMap[repoName] || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop&crop=entropy&auto=format&q=80`;
}
