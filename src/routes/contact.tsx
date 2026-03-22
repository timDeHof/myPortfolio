import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { LoadingSpinner } from "../components/common/loading-spinner";

const ContactPage = lazy(() => import("../pages/contact-page").then(module => ({ default: module.ContactPage })));

const PageLoader = () => (
  <div className="h-full flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const Route = createFileRoute("/contact")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContactPage />
    </Suspense>
  ),
});
