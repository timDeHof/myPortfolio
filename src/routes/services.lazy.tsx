import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { LoadingSpinner } from "../components/common/loading-spinner";
import { ServicesPage } from "../pages/services-page";

const PageLoader = () => (
  <div className="h-full flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const Route = createLazyFileRoute("/services")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ServicesPage />
    </Suspense>
  ),
});
