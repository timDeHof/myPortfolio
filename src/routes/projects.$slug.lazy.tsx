import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { LoadingSpinner } from "../components/common/loading-spinner";
import { ProjectDetailPage } from "../pages/project-detail-page";

const PageLoader = () => (
  <div className="h-full flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const Route = createLazyFileRoute("/projects/$slug")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProjectDetailPage />
    </Suspense>
  ),
});
