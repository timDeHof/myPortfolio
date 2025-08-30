import { env } from "../lib/env";

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
};

export type GitHubLanguages = {
  [language: string]: number;
};

const GITHUB_USERNAME = "timDeHof"; // Your GitHub username
const GITHUB_API_BASE = "https://api.github.com";

// Cache for repositories to avoid hitting rate limits
let repositoriesCache: GitHubRepository[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to get authentication headers
function getAuthHeaders(): HeadersInit {
  const token = env.VITE_GITHUB_PAT;

  if (token && token !== "your_github_personal_access_token_here") {
    return {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
  }
  return {
    "Accept": "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
};

export async function fetchGitHubRepositories(): Promise<GitHubRepository[]> {
  // Check if we have valid cached data
  if (repositoriesCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return repositoriesCache;
  }

  try {
    const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=all`;

    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ GitHub API error response:", errorText);
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const repositories: GitHubRepository[] = await response.json();

    // Apply minimal filtering - only exclude private repos
    const filteredRepos = repositories
      .filter((repo) => {
        const isPublic = !repo.private;
        return isPublic;
      })
      .sort((a, b) => {
        // Sort by stars first, then by last updated
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });

    // Cache the results
    repositoriesCache = filteredRepos;
    cacheTimestamp = Date.now();

    // Additional debug info
    if (filteredRepos.length === 0) {
      console.warn("⚠️ No repositories after filtering! This might indicate:");
      console.warn("  - All repositories are private");
      console.warn("  - GitHub API returned empty results");
      console.warn("  - Filtering logic is too restrictive");
    }

    return filteredRepos;
  }
  catch (error) {
    console.error("💥 Error fetching GitHub repositories:", error);

    throw new Error("Failed to fetch repositories from GitHub. Please check your internet connection and GitHub token.");
  }
};

export async function fetchRepositoryLanguages(languagesUrl: string): Promise<GitHubLanguages> {
  try {
    const response = await fetch(languagesUrl, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      console.warn(`⚠️ Failed to fetch languages for ${languagesUrl}: ${response.status}`);
      return {};
    }

    return await response.json();
  }
  catch (error) {
    console.error("💥 Error fetching repository languages:", error);
    return {};
  }
};

export function getTopLanguages(languages: GitHubLanguages): string[] {
  const sortedLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .map(([language]) => language);

  return sortedLanguages.slice(0, 3); // Return top 3 languages
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
  // Map specific repositories to their images
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
