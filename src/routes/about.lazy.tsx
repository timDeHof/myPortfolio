import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { PageLoader } from "../components/common/page-loader";
import { AboutPage } from "../pages/about-page";

export const Route = createLazyFileRoute("/about")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AboutPage />
    </Suspense>
  ),
});
