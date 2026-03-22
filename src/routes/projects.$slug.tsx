import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { LoadingSpinner } from "../components/common/loading-spinner";

const ProjectDetailPage = lazy(() => import("../pages/project-detail-page").then(module => ({ default: module.ProjectDetailPage })));

const PageLoader = () => (
  <div className="h-full flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const Route = createFileRoute("/projects/$slug")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProjectDetailPage />
    </Suspense>
  ),
});
