import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { LoadingSpinner } from "../components/common/loading-spinner";

const HomePage = lazy(() => import("../pages/home-page").then(module => ({ default: module.HomePage })));

const PageLoader = () => (
  <div className="h-full flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const Route = createFileRoute("/")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});
