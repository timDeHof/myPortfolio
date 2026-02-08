# Implementation Plan - Unified Serverless API & Portfolio CMS

This plan details the steps to build a unified serverless API for the portfolio, incorporating a blog backend, a custom contact form handler, dynamic portfolio data, and interactive documentation.

## Phase 1: Project Setup & Modular Router [checkpoint: none]
Goal: Initialize the new worker project and implement the core routing structure.

- [x] Task: Initialize the API worker project. [b964c29]
    - [x] Create `portfolio-api` directory.
    - [x] Initialize `package.json`, `wrangler.toml`, and `tsconfig.json`.
    - [x] Install dependencies: `hono`, `@hono/zod-openapi`, `zod`.
- [ ] Task: Implement the core modular router.
    - [ ] Create the main entry point with a base Hono router.
    - [ ] Set up a modular structure for namespaces (e.g., `src/routes/`).
    - [ ] Implement a basic health check endpoint at `/api/health`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Project Setup & Modular Router' (Protocol in workflow.md)

## Phase 2: Database & Storage Infrastructure [checkpoint: none]
Goal: Set up Cloudflare D1 and R2 and implement the data access layer.

- [ ] Task: Provision Cloudflare D1 and R2 resources.
    - [ ] Create a new D1 database (`portfolio-db`).
    - [ ] Create a new R2 bucket (`portfolio-assets`).
    - [ ] Update `wrangler.toml` with D1 and R2 bindings.
- [ ] Task: Define and initialize database schemas.
    - [ ] Create SQL migration files for `posts`, `skills`, `services`, and `certifications`.
    - [ ] Execute migrations against the D1 database (local and remote).
- [ ] Task: Implement the Asset Proxy endpoint.
    - [ ] Write tests for `/api/assets/*` retrieval.
    - [ ] Implement the `assets` route to fetch and serve objects from R2.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Database & Storage Infrastructure' (Protocol in workflow.md)

## Phase 3: Portfolio CMS Endpoints [checkpoint: none]
Goal: Implement CRUD/GET endpoints for portfolio data.

- [ ] Task: Implement Portfolio Data endpoints.
    - [ ] Write tests for `/api/portfolio/techstack`, `services`, and `certifications`.
    - [ ] Implement the routes to retrieve data from D1.
- [ ] Task: Implement Blog endpoints.
    - [ ] Write tests for `/api/blog` (list) and `/api/blog/:slug` (fetch).
    - [ ] Implement the blog routes using D1.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Portfolio CMS Endpoints' (Protocol in workflow.md)

## Phase 4: Contact Form & Integration [checkpoint: none]
Goal: Implement the Resend-powered contact handler and migrate GitHub proxy.

- [ ] Task: Implement the Contact Form handler.
    - [ ] Write tests for the `/api/contact` POST endpoint.
    - [ ] Implement the route with Zod validation and Resend API integration.
- [ ] Task: Migrate/Integrate the GitHub Proxy.
    - [ ] Write tests for the `/api/github/*` namespace.
    - [ ] Implement the proxy logic within the new modular router.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Contact Form & Integration' (Protocol in workflow.md)

## Phase 5: Documentation & Frontend Integration [checkpoint: none]
Goal: Add interactive docs and update the frontend to use the new API.

- [ ] Task: Implement OpenAPI & Scalar Documentation.
    - [ ] Define Zod schemas for all request/response objects.
    - [ ] Implement the `/api/docs` endpoint using `@scalar/hono-api-reference`.
- [ ] Task: Update Frontend Service Layer.
    - [ ] Update `src/services/api/github.ts` and environment variables.
    - [ ] Create new services (e.g., `src/services/api/portfolio.ts`) to fetch data from the new CMS endpoints.
    - [ ] Replace EmailJS usage with the new `/api/contact` endpoint.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Documentation & Frontend Integration' (Protocol in workflow.md)
