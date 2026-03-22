import React from "react";
import { Outlet } from "@tanstack/react-router";

import { Navbar } from "./navbar";
import { Footer } from "./footer";

export const Layout: React.FC = () => {
  return (
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
  );
};
