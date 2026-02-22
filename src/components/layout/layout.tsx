import React, { Suspense} from "react";
import { Outlet} from "react-router-dom";

import { LoadingSpinner } from "../common/loading-spinner";

import { Navbar} from "./navbar";
import { Footer } from "./footer";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Suspense fallback={<div className="h-full flex items-center justify-center"><LoadingSpinner size="lg" /></div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
