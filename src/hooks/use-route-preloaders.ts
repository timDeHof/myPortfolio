import { useEffect } from "react";

const routeModules = {
  "/about": function () { return import("../pages/about-page"); },
  "/projects": function () { return import("../pages/projects-page"); },
  "/services": function () { return import("../pages/services-page"); },
  "/contact": function () { return import("../pages/contact-page"); },
};

export function useRoutePreloader() {
  useEffect(() => {
    // Preload critical routes after 2s
    const timer = setTimeout(() => {
      Promise.all([
        routeModules["/about"](),
        routeModules["/projects"](),
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
}
