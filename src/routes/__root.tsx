import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Skip to main content
      </a>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" role="main" className="flex-1 pt-16" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Page not found</p>
        <Link to="/" className="text-teal-600 hover:text-teal-700 dark:text-teal-400 text-lg">
          Go home
        </Link>
      </div>
    </div>
  ),
});
