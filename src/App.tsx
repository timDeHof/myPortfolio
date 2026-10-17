import type { RouterHistory } from "@tanstack/react-router";
import type { HelmetServerState } from "react-helmet-async";

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

// Prerendering passes a memory history and the site origin, since Node has no window
export function createAppRouter(options: { history?: RouterHistory; origin?: string } = {}) {
  return createRouter({ routeTree, ...options });
}

type AppRouter = ReturnType<typeof createAppRouter>;

// Register router types for TypeScript
declare module "@tanstack/react-router" {
  interface Register {
    router: AppRouter;
  }
}

// Move lazy() call outside the component
const ReactQueryDevtoolsProduction = env.VITE_NODE_ENV === "development" ? lazy(() => import("@tanstack/react-query-devtools").then(module => ({ default: module.ReactQueryDevtools }))) : null;

function AppContent({ router }: { router: AppRouter }) {
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

interface AppProps {
  router: AppRouter;
  helmetContext?: { helmet?: HelmetServerState };
}

function App({ router, helmetContext }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <ErrorBoundary>
          <LazyMotion features={domAnimation} strict>
            <AppContent router={router} />
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
