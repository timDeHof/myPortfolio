import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { domAnimation, LazyMotion } from "framer-motion";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

import { ErrorBoundary } from "./components/common/error-boundary";
import { useTheme } from "./hooks/use-theme";
import { env } from "./lib/env";
import { queryClient } from "./lib/query-client";
import { routeTree } from "./routeTree.gen";

// Create router instance
const router = createRouter({ routeTree });

// Register router types for TypeScript
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Move lazy() call outside the component
const ReactQueryDevtoolsProduction = env.VITE_NODE_ENV === "development" ? lazy(() => import("@tanstack/react-query-devtools").then(module => ({ default: module.ReactQueryDevtools }))) : null;

function AppContent() {
  // Initialize theme
  useTheme();

  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* TanStack Router Devtools disabled due to compatibility issue with router instantiation */}
      {/* TODO: Re-enable once TanStack Router devtools compatibility is resolved */}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ErrorBoundary>
          <LazyMotion features={domAnimation} strict>
            <AppContent />
          </LazyMotion>
        </ErrorBoundary>
      </HelmetProvider>

      {/* React Query Devtools - only in development */}
      {ReactQueryDevtoolsProduction && (
        <Suspense fallback={null}>
          <ReactQueryDevtoolsProduction
            initialIsOpen={false}
            position="right"
          />
        </Suspense>
      )}
    </QueryClientProvider>
  );
}

export default App;
