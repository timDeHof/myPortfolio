import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";

import { routes } from "./routes";

export interface Env {
  portfolio_db: D1Database;
  portfolio_assets: R2Bucket;
  RESEND_API_KEY: string;
  GITHUB_PAT: string;
  GITHUB_API_URL: string;
}

const app = new OpenAPIHono<{ Bindings: Env }>();

// Enable CORS for all origins (or specific ones if preferred)
app.use("*", cors());

// Mount the routes at /api
app.route("/api", routes);

// OpenAPI Specification
app.doc("/api/openapi.json", {
  openapi: "3.1.0",
  info: {
    title: "Unified Portfolio API",
    version: "1.0.0",
    description: "A unified serverless API for Tim DeHof's portfolio, managing blog posts, tech stack, services, and contact forms.",
  },
  servers: [
    {
      url: "https://portfolio-api.ttdehof.workers.dev",
      description: "Production server",
    },
    {
      url: "http://localhost:8787",
      description: "Local development",
    },
  ],
});

// Scalar API Reference
app.get(
  "/api/docs",
  apiReference({
    spec: {
      url: "/api/openapi.json",
    },
    theme: "purple",
    layout: "modern",
  }),
);

export default app;
export { app };
