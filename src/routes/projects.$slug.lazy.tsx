import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { PageLoader } from "../components/common/page-loader";
import { ProjectDetailPage } from "../pages/project-detail-page";

export const Route = createLazyFileRoute("/projects/$slug")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProjectDetailPage />
    </Suspense>
  ),
});
