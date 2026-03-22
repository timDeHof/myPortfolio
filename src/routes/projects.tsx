import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { LoadingSpinner } from "../components/common/loading-spinner";
import { ProjectsPage } from "../pages/projects-page";
import { fetchAllProjects } from "../hooks/useProjects";
import type { ProjectWithSource } from "../hooks/useProjects";

const PageLoader = () => (
  <div className="h-full flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// Search params schema
interface ProjectsSearch {
  project?: string;
}

export const Route = createFileRoute("/projects")({
  validateSearch: (search: Record<string, unknown>): ProjectsSearch => {
    return {
      project: search.project as string | undefined,
    };
  },
  loader: async (): Promise<{ projects: ProjectWithSource[] }> => {
    const projects = await fetchAllProjects();
    return { projects };
  },
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProjectsPage />
    </Suspense>
  ),
});
