/* eslint-disable unicorn/filename-case */
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ErrorBoundary } from "./components/common/error-boundary";
import { LoadingSpinner } from "./components/common/loading-spinner";
import { Layout } from "./components/layout/layout";
import { useTheme } from "./hooks/use-theme";
import { env } from "./lib/env";
import { queryClient } from "./lib/query-client";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("./pages/home-page").then(module => ({ default: module.HomePage })));
const AboutPage = lazy(() => import("./pages/about-page").then(module => ({ default: module.AboutPage })));
const ProjectsPage = lazy(() => import("./pages/projects-page").then(module => ({ default: module.ProjectsPage })));
const ServicesPage = lazy(() => import("./pages/services-page").then(module => ({ default: module.ServicesPage })));
const ContactPage = lazy(() => import("./pages/contact-page").then(module => ({ default: module.ContactPage })));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

function AppContent() {
  // Initialize theme
  useTheme();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={(
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            )}
          />
          <Route
            path="about"
            element={(
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            )}
          />
          <Route
            path="projects"
            element={(
              <Suspense fallback={<PageLoader />}>
                <ProjectsPage />
              </Suspense>
            )}
          />
          <Route
            path="services"
            element={(
              <Suspense fallback={<PageLoader />}>
                <ServicesPage />
              </Suspense>
            )}
          />
          <Route
            path="contact"
            element={(
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            )}
          />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  const ReactQueryDevtoolsProduction = env.VITE_NODE_ENV === "development" ? lazy(() => import("@tanstack/react-query-devtools").then(module => ({ default: module.ReactQueryDevtools }))) : null;
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ErrorBoundary>
          <Router>
            <AppContent />
          </Router>
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
