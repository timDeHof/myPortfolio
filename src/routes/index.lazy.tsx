import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { PageLoader } from "../components/common/page-loader";
import { HomePage } from "../pages/home-page";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});
