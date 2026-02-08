# Implementation Plan - Unified Serverless API & Portfolio CMS

This plan details the steps to build a unified serverless API for the portfolio, incorporating a blog backend, a custom contact form handler, dynamic portfolio data, and interactive documentation.

## Phase 1: Project Setup & Modular Router [checkpoint: 14e0525]
Goal: Initialize the new worker project and implement the core routing structure.

- [x] Task: Initialize the API worker project. [b964c29]
    - [x] Create `portfolio-api` directory.
    - [x] Initialize `package.json`, `wrangler.toml`, and `tsconfig.json`.
    - [x] Install dependencies: `hono`, `@hono/zod-openapi`, `zod`.
- [x] Task: Implement the core modular router. [38eae46]
    - [x] Create the main entry point with a base Hono router.
    - [x] Set up a modular structure for namespaces (e.g., `src/routes/`).
    - [x] Implement a basic health check endpoint at `/api/health`.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Project Setup & Modular Router' (Protocol in workflow.md) [14e0525]

## Phase 2: Database & Storage Infrastructure [checkpoint: 843e6a3]
Goal: Set up Cloudflare D1 and R2 and implement the data access layer.

- [x] Task: Provision Cloudflare D1 and R2 resources. [245c088]
    - [x] Create a new D1 database (`portfolio-db`).
    - [x] Create a new R2 bucket (`portfolio-assets`).
    - [x] Update `wrangler.toml` with D1 and R2 bindings.
- [x] Task: Define and initialize database schemas. [85d335f]
    - [x] Create SQL migration files for `posts`, `skills`, `services`, and `certifications`.
    - [x] Execute migrations against the D1 database (local and remote).
- [x] Task: Implement the Asset Proxy endpoint. [3cb3db4]
    - [x] Write tests for `/api/assets/*` retrieval.
    - [x] Implement the `assets` route to fetch and serve objects from R2.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Database & Storage Infrastructure' (Protocol in workflow.md) [843e6a3]

## Phase 3: Portfolio CMS Endpoints [checkpoint: a7a7723]
Goal: Implement CRUD/GET endpoints for portfolio data.

- [x] Task: Implement Portfolio Data endpoints. [37374d7]
    - [x] Write tests for `/api/portfolio/techstack`, `services`, and `certifications`.
    - [x] Implement the routes to retrieve data from D1.
- [x] Task: Implement Blog endpoints. [cad59a8]
    - [x] Write tests for `/api/blog` (list) and `/api/blog/:slug` (fetch).
    - [x] Implement the blog routes using D1.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Portfolio CMS Endpoints' (Protocol in workflow.md) [a7a7723]

## Phase 4: Contact Form & Integration [checkpoint: b734ecf]
Goal: Implement the Resend-powered contact handler and migrate GitHub proxy.

- [x] Task: Implement the Contact Form handler. [d6f464f]
    - [x] Write tests for the `/api/contact` POST endpoint.
    - [x] Implement the route with Zod validation and Resend API integration.
- [x] Task: Migrate/Integrate the GitHub Proxy. [b5a990b]
    - [x] Write tests for the `/api/github/*` namespace.
    - [x] Implement the proxy logic within the new modular router.
- [x] Task: Conductor - User Manual Verification 'Phase 4: Contact Form & Integration' (Protocol in workflow.md) [b734ecf]

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
