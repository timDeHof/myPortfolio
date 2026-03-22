/* eslint-disable unicorn/filename-case */
import { QueryClientProvider } from "@tanstack/react-query";
import { domAnimation, LazyMotion } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";

import { ErrorBoundary } from "./components/common/error-boundary";
import { router } from "./router/router";
import { RouterProvider } from "@tanstack/react-router";
import { useTheme } from "./hooks/use-theme";
import { env } from "./lib/env";
import { queryClient } from "./lib/query-client";

// Move lazy() call outside the component
const ReactQueryDevtoolsProduction = env.VITE_NODE_ENV === "development" ? lazy(() => import("@tanstack/react-query-devtools").then(module => ({ default: module.ReactQueryDevtools }))) : null;

function AppContent() {
  // Initialize theme
  useTheme();

  return (
    <div className="App">
      <RouterProvider router={router} />
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
      {ReactQueryDevtoolsProduction  && (
        <Suspense  fallback={null}>
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
