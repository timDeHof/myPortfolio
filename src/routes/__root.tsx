import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <div className="min-h-[100dvh] flex flex-col">
        <Navbar />
        <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  ),
  notFoundComponent: () => (
    <div className="min-h-[100dvh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Page not found</p>
        <Link to="/" className="text-secondary hover:text-secondary/80 text-lg">
          Go home
        </Link>
      </div>
    </div>
  ),
});
