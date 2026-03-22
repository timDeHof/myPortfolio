import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { LoadingSpinner } from "../components/common/loading-spinner";
import { AboutPage } from "../pages/about-page";

const PageLoader = () => (
  <div className="h-full flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const Route = createLazyFileRoute("/about")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AboutPage />
    </Suspense>
  ),
});
