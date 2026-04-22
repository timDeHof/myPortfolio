/**
 * Shared utilities for fetching data from GitHub API (via worker proxy).
 */

import type { Project } from "../types/project";

/**
 * Base URL for the portfolio API worker.
 */
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://portfolio-api.ttdehof.workers.dev/api";

/**
 * Fetches and decodes a JSON file from a GitHub repository.
 * The content is expected to be base64-encoded.
 */
export async function fetchGitHubJson<T>(
  owner: string,
  repo: string,
  path: string,
): Promise<T | null> {
  try {
    const url = `${API_BASE}/github/repos/${owner}/${repo}/contents/${path}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Worker API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (data.content) {
      const decoded = new TextDecoder().decode(
        Uint8Array.from(atob(data.content.replace(/\n/g, "")), (c) =>
          c.charCodeAt(0),
        ),
      );
      return JSON.parse(decoded) as T;
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch GitHub JSON:", error);
    return null;
  }
}