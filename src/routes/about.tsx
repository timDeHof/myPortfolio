import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { LoadingSpinner } from "../components/common/loading-spinner";

const AboutPage = lazy(() => import("../pages/about-page").then(module => ({ default: module.AboutPage })));

const PageLoader = () => (
  <div className="h-full flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const Route = createFileRoute("/about")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AboutPage />
    </Suspense>
  ),
});
