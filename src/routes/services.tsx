import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { LoadingSpinner } from "../components/common/loading-spinner";

const ServicesPage = lazy(() => import("../pages/services-page").then(module => ({ default: module.ServicesPage })));

const PageLoader = () => (
  <div className="h-full flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const Route = createFileRoute("/services")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ServicesPage />
    </Suspense>
  ),
});
