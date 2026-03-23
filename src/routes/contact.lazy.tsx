import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { PageLoader } from "../components/common/page-loader";
import { ContactPage } from "../pages/contact-page";

export const Route = createLazyFileRoute("/contact")({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContactPage />
    </Suspense>
  ),
});
