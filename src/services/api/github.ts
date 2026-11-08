import type { GitHubLanguages, GitHubRepository, GitHubUser } from "../../types/github";

import { env } from "../../lib/env";
import { GitHubAPIError } from "../../types/github";

// Re-export types and values for backward compatibility
export type { GitHubLanguages, GitHubRepository, GitHubUser } from "../../types/github";
export { GitHubAPIError } from "../../types/github";

const GITHUB_USERNAME = "timDeHof";
// Update the API base to point to the standalone worker proxy
const GITHUB_API_BASE = `${env.VITE_API_BASE_URL}/github`;
// fetchRepository reads at most this many pages of 100 repositories
const MAX_REPOSITORY_PAGES = 10;

// Repositories to exclude from portfolio (add repo names here)
const EXCLUDED_REPOS = [
  "timDeHof", // Profile README repo
  "test-repo",
  "playground",
  "scratch",
  // Add any repo names you want to hide
];

// Base64 alphabet used by the pure-JS fallback decoder below
const BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * Decodes a base64 string to a binary string.
 * Uses the global `atob` when available (browser, Node 16+); falls back to a
 * pure-JS decoder so this also works in SSR/Node environments without `atob`.
 */
function decodeBase64(input: string): string {
  if (typeof atob === "function") {
    return atob(input.replace(/\n/g, ""));
  }

  let output = "";
  let buffer = 0;
  let bits = 0;
  for (const char of input) {
    if (char === "=") {
      break;
    }
    const value = BASE64_ALPHABET.indexOf(char);
    if (value === -1) {
      continue; // Skip whitespace / line breaks
    }
    buffer = (buffer << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      output += String.fromCharCode((buffer >> bits) & 0xFF);
    }
  }
  return output;
}

// Simplified fetch wrapper for the proxy
async function githubFetch<T>(url: string, signal?: AbortSignal): Promise<T> {
  try {
    // Fetch directly from GitHub API (proxy handles the routing)
    const response = signal ? await fetch(url, { signal }) : await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ GitHub API Error Response:`, errorText);

      let errorMessage = `GitHub API error: ${response.status} ${response.statusText}`;

      // Check if response is HTML (rate limit or auth issue)
      if (errorText.trim().startsWith("<")) {
        if (errorText.includes("API rate limit exceeded")) {
          errorMessage = "GitHub API rate limit exceeded. Please try again later.";
        }
        else if (errorText.includes("authentication") || errorText.includes("login")) {
          errorMessage = "GitHub authentication required. Please check your credentials.";
        }
        else {
          errorMessage = "GitHub API returned HTML response. This might be a rate limit or authentication issue.";
        }
      }
      // Try to parse as JSON if not HTML
      else {
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        }
        catch {
          // If we can't parse the error as JSON, use the raw text
          errorMessage = errorText || errorMessage;
        }
      }

      throw new GitHubAPIError(response.status, response.statusText, url, errorMessage);
    }

    // Check if response is HTML (shouldn't happen for successful responses, but just in case)
    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("text/html")) {
      const textData = await response.text();
      console.error(`⚠️ GitHub API returned HTML instead of JSON:`, textData);
      throw new GitHubAPIError(response.status, response.statusText, url, "GitHub API returned HTML response instead of JSON");
    }

    const data = await response.json();
    return data;
  }
  catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    // The caller cancelled the request (a timeout or a cancelled query), so it isn't a network failure
    if (signal?.aborted) {
      throw signal.reason;
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

  // Fetch repositories with demo links
  fetchRepositories: async (): Promise<GitHubRepository[]> => {
    const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=all`;
    const repositories = await githubFetch<GitHubRepository[]>(url);

    // Filter for public, non-archived, non-excluded repositories with demo links
    const publicRepos = repositories.filter((repo) => {
      const isPublic = !repo.private;
      const isNotArchived = !repo.archived;
      const isNotExcluded = !EXCLUDED_REPOS.includes(repo.name);
      const hasDemo = repo.homepage && repo.homepage.trim() !== "";

      return isPublic && isNotArchived && isNotExcluded && hasDemo;
    });

    return publicRepos;
  },

  // Fetch one repository, for its star count. The proxy does not expose
  // /repos/:owner/:repo, so this reads the same list fetchRepositories uses.
  fetchRepository: async (owner: string, repo: string, signal?: AbortSignal): Promise<GitHubRepository> => {
    const url = `${GITHUB_API_BASE}/users/${owner}/repos?sort=updated&per_page=100&type=all`;
    // A full page of 100 may have more after it, so keep going until a short
    // page. The bound stops a proxy that ignores `page` from looping forever.
    for (let page = 1; page <= MAX_REPOSITORY_PAGES; page++) {
      const repositories = await githubFetch<GitHubRepository[]>(`${url}&page=${page}`, signal);
      const match = repositories.find(repository => repository.name === repo);
      if (match) {
        return match;
      }
      if (repositories.length < 100) {
        break;
      }
    }
    throw new GitHubAPIError(404, "Not Found", url, `No repository named ${repo}`);
  },

  // Fetch repository languages
  fetchRepositoryLanguages: async (languagesUrl: string): Promise<GitHubLanguages> => {
    try {
      // The languagesUrl is a full URL, so we need to proxy it correctly.
      const proxiedUrl = languagesUrl.replace("https://api.github.com", GITHUB_API_BASE);
      return await githubFetch<GitHubLanguages>(proxiedUrl);
    }
    catch (error) {
      console.warn(`⚠️ Failed to fetch languages for ${languagesUrl}:`, error);
      return {};
    }
  },

  // Fetch and decode base64-encoded JSON from GitHub Contents API
  fetchContents: async <T>(owner: string, repo: string, path: string): Promise<T> => {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`;
    const data = await githubFetch<{ content?: string }>(url);

    if (!data.content) {
      throw new GitHubAPIError(0, "Empty Content", url, `No content field in response for ${path}`);
    }

    const decoded = new TextDecoder().decode(
      Uint8Array.from(decodeBase64(data.content), c =>
        c.charCodeAt(0)),
    );
    return JSON.parse(decoded) as T;
  },
};

// Query Keys - Centralized for easy cache management
export const githubKeys = {
  all: ["github"] as const,
  user: () => [...githubKeys.all, "user", GITHUB_USERNAME] as const,
  repositories: () => [...githubKeys.all, "repositories", GITHUB_USERNAME] as const,
  languages: (repoName: string) => [...githubKeys.all, "languages", GITHUB_USERNAME, repoName] as const,
  contents: (owner: string, repo: string, path: string) => [...githubKeys.all, "contents", owner, repo, path] as const,
};
