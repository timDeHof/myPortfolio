import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { LoadingSpinner } from "../components/common/loading-spinner";
import { BlogPage } from "../pages/blog-page";

const PageLoader = () => (
  <div className="h-full flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const Route = createLazyFileRoute("/blog")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogPage />
    </Suspense>
  ),
});
