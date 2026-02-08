# Specification - Unified Serverless API & Portfolio CMS

## Overview
This track involves building a comprehensive, unified serverless API for the portfolio. This service consolidates existing proxy logic, replaces external email services, and establishes a "Portfolio CMS" backend using Cloudflare D1 and R2. It will also feature interactive API documentation using OpenAPI and Scalar.

## Goals
- **Consolidation:** Move toward a single, maintainable backend worker using a modular routing pattern.
- **Independence:** Replace third-party dependencies (EmailJS) with direct API integrations (Resend).
- **Portfolio CMS:** Decouple portfolio data and assets from frontend code by serving skills, services, certifications, and media (icons/images) via dynamic API endpoints.
- **Asset Control:** Proxy all media assets through the API to allow for future optimization or access control.
- **Auto-Documentation:** Provide a self-documenting API using OpenAPI and the Scalar interactive UI.

## Functional Requirements
- **Unified Router:** Implement a modular routing layer (using Hono and Zod) to handle multiple namespaces:
    - `/api/github/*`: Proxy requests to GitHub.
    - `/api/contact`: Handle contact form submissions via Resend.
    - `/api/blog/*`: CRUD operations for blog posts and metadata.
    - `/api/portfolio/*`: Endpoints for `techstack`, `services`, and `certifications`.
    - `/api/assets/*`: Proxy requests to retrieve media (icons, images) stored in Cloudflare R2.
- **Contact Form Handler:**
    - Accept POST requests, validate input, and send notifications via Resend.
- **Data Management (Cloudflare D1):**
    - Initialize and manage schemas for Blog, Tech Stack, Services, and Certifications.
    - Store references to R2 asset keys in the database.
- **Asset Storage (Cloudflare R2):**
    - Configure an R2 bucket for storing portfolio icons, project images, and other media.
- **API Documentation:**
    - Implement a `/api/docs` endpoint using `@hono/zod-openapi` and `@scalar/hono-api-reference`.

## Tech Stack
- **Runtime:** Cloudflare Workers
- **Router:** Hono (with `@hono/zod-openapi`)
- **Database:** Cloudflare D1 (SQL)
- **Object Storage:** Cloudflare R2
- **Email:** Resend API
- **Documentation:** Scalar (`@scalar/hono-api-reference`)
- **Validation:** Zod
- **Language:** TypeScript

## Acceptance Criteria
- [ ] A new unified worker is deployed and responding at defined routes.
- [ ] Contact form submissions successfully send emails via Resend.
- [ ] Portfolio data is correctly retrieved from D1.
- [ ] **Asset Proxy:** Assets stored in R2 are successfully served via the `/api/assets/*` endpoint.
- [ ] **Interactive API Docs:** An interactive Scalar UI is accessible at `/api/docs`.
- [ ] The codebase demonstrates a modular pattern for adding new endpoints.
- [ ] The frontend is updated to fetch data and assets from these new unified endpoints.

## Out of Scope
- Building the frontend UI for the blog or an admin dashboard for asset uploads.
- Authentication (to be handled in a future "Admin" track).
