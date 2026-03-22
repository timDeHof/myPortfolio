import { createRouter, createRootRoute, createRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import React from "react";

import { Layout } from "../components/layout/layout";
import { LoadingSpinner } from "../components/common/loading-spinner";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("../pages/home-page").then(module => ({ default: module.HomePage })));
const AboutPage = lazy(() => import("../pages/about-page").then(module => ({ default: module.AboutPage })));
const ProjectsPage = lazy(() => import("../pages/projects-page").then(module => ({ default: module.ProjectsPage })));
const ProjectDetailPage = lazy(() => import("../pages/project-detail-page").then(module => ({ default: module.ProjectDetailPage })));
const ServicesPage = lazy(() => import("../pages/services-page").then(module => ({ default: module.ServicesPage })));
const ContactPage = lazy(() => import("../pages/contact-page").then(module => ({ default: module.ContactPage })));
const BlogPage = lazy(() => import("../pages/blog-page").then(module => ({ default: module.BlogPage })));

// Loading fallback component
const PageLoader: React.FC = () => (
  <div className="h-full flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <Layout />
  ),
});

// Index route (home page)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

// About page route
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AboutPage />
    </Suspense>
  ),
});

// Projects page route with search params
const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  validateSearch: (search: Record<string, unknown>) => {
    return {
      project: search.project as string | undefined,
    };
  },
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProjectsPage />
    </Suspense>
  ),
});

// Project detail route
const projectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects/$slug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProjectDetailPage />
    </Suspense>
  ),
});

// Services page route
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ServicesPage />
    </Suspense>
  ),
});

// Contact page route
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContactPage />
    </Suspense>
  ),
});

// Blog page route
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogPage />
    </Suspense>
  ),
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  projectsRoute,
  projectDetailRoute,
  servicesRoute,
  contactRoute,
  blogRoute,
]);

// Create the router
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

// Type declaration for route matching
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
