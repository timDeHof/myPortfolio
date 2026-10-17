import { createFileRoute, redirect } from "@tanstack/react-router";

// The Services page moved to Jokma's site (P1). public/_redirects sends full
// page loads of /services to /contact with a 301. This covers what reaches the
// client router instead: in-app links and the service worker's index.html
// fallback for repeat visitors.
export const Route = createFileRoute("/services")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", replace: true });
  },
});
