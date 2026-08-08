import { useQuery } from "@tanstack/react-query";

import { githubAPI } from "@/services/api/github";

import type { Project } from "../types/project";

import { findProjectBySlug, projectsIndex } from "../data/projects-index";

export interface ProjectWithSource extends Project {
  source: "project-json" | "fallback";
}

/**
 * Shared helper that fetches project data from GitHub with fallback to static data.
 */
async function fetchProjectWithFallback(
  entry: { owner: string; repo: string; path: string; slug: string; fallbackData?: Project },
): Promise<ProjectWithSource> {
  try {
    const projectJson = await githubAPI.fetchContents<Project>(entry.owner, entry.repo, entry.path);
    return {
      ...projectJson,
      slug: entry.slug,
      source: "project-json" as const,
    };
  }
  catch {
    if (entry.fallbackData) {
      return {
        ...entry.fallbackData,
        slug: entry.slug,
        source: "fallback" as const,
      } as ProjectWithSource;
    }
    throw new Error(`No data found for project: ${entry.slug}`);
  }
}

async function fetchAllProjects(): Promise<ProjectWithSource[]> {
  const results = await Promise.all(
    projectsIndex.map(async (entry) => {
      try {
        return await fetchProjectWithFallback(entry);
      }
      catch {
        return null;
      }
    }),
  );

  return results.filter((p): p is ProjectWithSource => p !== null);
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchAllProjects,
    staleTime: 1000 * 60 * 5,
  });
}

// Re-export for use in route loaders
export { fetchAllProjects };

export function useProject(slug: string) {
  const entry = findProjectBySlug(slug);

  return useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      if (!entry) {
        throw new Error(`Project not found: ${slug}`);
      }

      return fetchProjectWithFallback(entry);
    },
    enabled: !!entry,
    staleTime: 1000 * 60 * 5,
  });
}
