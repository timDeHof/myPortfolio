/* eslint-disable unicorn/filename-case */
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ErrorBoundary } from "./components/common/error-boundary";
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

// Move lazy() call outside the component
const ReactQueryDevtoolsProduction = env.VITE_NODE_ENV === "development" ? lazy(() => import("@tanstack/react-query-devtools").then(module => ({ default: module.ReactQueryDevtools }))) : null;

function AppContent() {
  // Initialize theme
  useTheme();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
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
