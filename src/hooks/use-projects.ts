import { queryOptions, useQuery } from "@tanstack/react-query";

import { githubAPI, GitHubAPIError } from "@/services/api/github";

import type { ProjectIndexEntry } from "../data/projects-index";
import type { Project } from "../types/project";

import { findProjectBySlug } from "../data/projects-index";
import { retryDuringPrerender } from "../lib/query-client";

export interface ProjectWithSource extends Project {
  source: "project-json" | "fallback";
}

/**
 * Shared helper that fetches project data from GitHub with fallback to static data.
 */
async function fetchProjectWithFallback(
  entry: ProjectIndexEntry,
): Promise<ProjectWithSource> {
  try {
    const projectJson = await githubAPI.fetchContents<Project>(entry.owner, entry.repo, entry.path);
    return {
      ...projectJson,
      slug: entry.slug,
      source: "project-json" as const,
    };
  }
  catch (error) {
    if (entry.fallbackData) {
      return {
        ...entry.fallbackData,
        slug: entry.slug,
        source: "fallback" as const,
      };
    }
    const message = `No data found for project: ${entry.slug}`;
    // Keep the status, so the query client can tell a missing file (no retry)
    // from a network or server error (retry)
    if (error instanceof GitHubAPIError) {
      throw new GitHubAPIError(error.status, error.statusText, error.url, message);
    }
    throw new Error(message);
  }
}

// Shared with the /projects and /projects/$slug route loaders, which fill the cache before render
export function projectQuery(slug: string) {
  const entry = findProjectBySlug(slug);

  return queryOptions({
    queryKey: ["project", slug],
    queryFn: async () => {
      if (!entry) {
        throw new Error(`Project not found: ${slug}`);
      }

      return fetchProjectWithFallback(entry);
    },
    enabled: !!entry,
    staleTime: 1000 * 60 * 5,
    retry: retryDuringPrerender,
  });
}

export function useProject(slug: string) {
  return useQuery(projectQuery(slug));
}
