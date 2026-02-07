# Implementation Plan - Fix GitHub API with Standalone Worker

This plan details the steps to implement a standalone Cloudflare Worker for proxying GitHub API requests and updating the portfolio frontend to consume it.

## Phase 1: Standalone Worker Development [checkpoint: faddad2]
Goal: Create and deploy a secure proxy worker.

- [x] Task: Initialize the worker project structure. [966fb67]
    - [x] Create a dedicated directory or repository for the worker.
    - [x] Set up `wrangler.toml` for the standalone worker.
- [x] Task: Implement the proxy logic. [0d119c5]
    - [x] Write logic to handle incoming requests and map them to GitHub API paths.
    - [x] Implement secure injection of the `Authorization` header using environment secrets.
    - [x] Add basic error handling and CORS support.
- [x] Task: Deploy and configure the worker. [b17b472]
    - [x] Deploy the worker to Cloudflare.
    - [x] Configure the `GITHUB_PAT` secret using `wrangler secret put`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Standalone Worker Development' (Protocol in workflow.md)

## Phase 2: Frontend Service Integration
Goal: Update the portfolio to use the new proxy URL.

- [ ] Task: Update frontend API services.
    - [ ] Write tests for the updated fetch logic in `src/services/api/__tests__/github.test.ts`.
    - [ ] Modify `src/services/api/github.ts` to point to the new standalone Worker URL.
- [ ] Task: Update environment configuration.
    - [ ] Add the new Worker URL to `.env` and `src/lib/env.ts`.
    - [ ] Remove any legacy proxy configurations from `vite.config.ts` if no longer needed.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Frontend Service Integration' (Protocol in workflow.md)

## Phase 3: Validation and Cleanup
Goal: Ensure everything is working correctly in production and remove dead code.

- [ ] Task: End-to-end verification.
    - [ ] Verify that repository data and stats are loading correctly in development and production.
    - [ ] Confirm that no sensitive tokens are visible in network requests.
- [ ] Task: Legacy code removal.
    - [ ] Remove the unused `functions/api/github/` directory if any remnants exist.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Validation and Cleanup' (Protocol in workflow.md)
