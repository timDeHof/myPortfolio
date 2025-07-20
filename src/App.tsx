import { Suspense, lazy} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from './components/layout/layout';
import { LoadingSpinner } from './components/common/loading-spinner';
import { ErrorBoundary } from './components/common/error-boundary';
import { useTheme } from './hooks/use-theme';
import { queryClient } from './lib/query-client';
import { env } from './lib/env';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/home-page').then(module => ({ default: module.HomePage })));
const AboutPage = lazy(() => import('./pages/about-page').then(module => ({ default: module.AboutPage })));
const ProjectsPage = lazy(() => import('./pages/projects-page').then(module => ({ default: module.ProjectsPage })));
const ServicesPage = lazy(() => import('./pages/services-page').then(module => ({ default: module.ServicesPage })));
const ContactPage = lazy(() => import('./pages/contact-page').then(module => ({ default: module.ContactPage })));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

function AppContent() {
  // Initialize theme
  useTheme();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="projects"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProjectsPage />
              </Suspense>
            }
          />
          <Route
            path="services"
            element={
              <Suspense fallback={<PageLoader />}>
                <ServicesPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            }
          />
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
      {env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="right"
        />
      )}
    </QueryClientProvider>
  );
}

export default App;
