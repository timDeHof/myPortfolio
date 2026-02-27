import { useQuery } from "@tanstack/react-query";

import type { Project } from "../types/project";
import { projectsIndex, findProjectBySlug } from "../data/projectsIndex";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://portfolio-api.ttdehof.workers.dev/api";

interface GitHubContentResponse {
  content?: string;
  encoding?: string;
}

async function fetchProjectJson(owner: string, repo: string, path: string): Promise<Project | null> {
  try {
    const url = `${API_BASE}/github/repos/${owner}/${repo}/contents/${path}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Worker API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: GitHubContentResponse = await response.json();

    if (data.content) {
      const decoded = new TextDecoder().decode(
        Uint8Array.from(atob(data.content.replace(/\n/g, "")), c => c.charCodeAt(0))
      );
      return JSON.parse(decoded);
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}

export interface ProjectWithSource extends Project {
  source: "project-json" | "fallback";
}

async function fetchAllProjects(): Promise<ProjectWithSource[]> {
  const results = await Promise.all(
    projectsIndex.map(async (entry) => {
      const projectJson = await fetchProjectJson(entry.owner, entry.repo, entry.path);

      if (projectJson) {
        return {
          ...projectJson,
          slug: entry.slug,
          source: "project-json" as const,
        };
      }

      if (entry.fallbackData) {
        return {
          ...entry.fallbackData,
          slug: entry.slug,
          source: "fallback" as const,
        } as ProjectWithSource;
      }

      return null;
    })
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

export function useProject(slug: string) {
  const entry = findProjectBySlug(slug);

  return useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      if (!entry) {
        throw new Error(`Project not found: ${slug}`);
      }

      const projectJson = await fetchProjectJson(entry.owner, entry.repo, entry.path);

      if (projectJson) {
        return {
          ...projectJson,
          slug: entry.slug,
          source: "project-json" as const,
        };
      }

      if (entry.fallbackData) {
        return {
          ...entry.fallbackData,
          slug: entry.slug,
          source: "fallback" as const,
        } as ProjectWithSource;
      }

      throw new Error(`No data found for project: ${slug}`);
    },
    enabled: !!entry,
    staleTime: 1000 * 60 * 5,
  });
}
