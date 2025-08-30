import React from "react";
import { Outlet } from "react-router-dom";

import { ErrorBoundary } from "../common/error-boundary";
import { Footer } from "./footer";
import { Navigation } from "./navigation";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};