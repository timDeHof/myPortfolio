import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { PageLoader } from "../components/common/page-loader";
import { ServicesPage } from "../pages/services-page";

export const Route = createLazyFileRoute("/services")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ServicesPage />
    </Suspense>
  ),
});
