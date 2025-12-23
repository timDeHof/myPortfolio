import type {
  GitHubLanguages,
  GitHubRepository,
} from "./api/github";

import { queryClient } from "../lib/query-client";
import {
  getRepositoryImage,
  githubAPI,
  GitHubAPIError,
} from "./api/github";

export { getRepositoryImage };

export async function fetchGitHubRepositories(): Promise<GitHubRepository[]> {
  try {
    const repositories = await githubAPI.fetchRepositories();
    return repositories;
  }
  catch (error) {
    console.error("💥 Error fetching GitHub repositories:", error);
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new Error("Failed to fetch repositories from GitHub.");
  }
}

export async function fetchRepositoryLanguages(
  languagesUrl: string,
): Promise<GitHubLanguages> {
  try {
    return await githubAPI.fetchRepositoryLanguages(languagesUrl);
  }
  catch (error) {
    console.error("💥 Error fetching repository languages:", error);
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new Error("Failed to fetch repository languages.");
  }
}

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
