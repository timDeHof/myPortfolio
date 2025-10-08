import { ErrorBoundary } from "@components/common/error-boundary";
import Footer from "@components/layout/footer";
import Navigation from "@components/layout/navigation";
import React from "react";
import { Outlet } from "react-router-dom";

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
