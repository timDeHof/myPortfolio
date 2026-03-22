/* eslint-disable */
import { Route as rootRoute } from "./__root";
import { Route as indexRoute } from "./index";
import { Route as aboutRoute } from "./about";
import { Route as projectsRoute } from "./projects";
import { Route as projectsSlugRoute } from "./projects.$slug";
import { Route as servicesRoute } from "./services";
import { Route as contactRoute } from "./contact";
import { Route as blogRoute } from "./blog";

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof indexRoute;
      parentRoute: typeof rootRoute;
    };
    "/about": {
      preLoaderRoute: typeof aboutRoute;
      parentRoute: typeof rootRoute;
    };
    "/projects": {
      preLoaderRoute: typeof projectsRoute;
      parentRoute: typeof rootRoute;
    };
    "/projects/$slug": {
      preLoaderRoute: typeof projectsSlugRoute;
      parentRoute: typeof rootRoute;
    };
    "/services": {
      preLoaderRoute: typeof servicesRoute;
      parentRoute: typeof rootRoute;
    };
    "/contact": {
      preLoaderRoute: typeof contactRoute;
      parentRoute: typeof rootRoute;
    };
    "/blog": {
      preLoaderRoute: typeof blogRoute;
      parentRoute: typeof rootRoute;
    };
  }
}

const rootRouteWithChildren = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  projectsRoute,
  projectsSlugRoute,
  servicesRoute,
  contactRoute,
  blogRoute,
]);

export const routeTree = rootRouteWithChildren;
