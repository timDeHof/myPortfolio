# Specification - Fix GitHub API with Standalone Worker

## Overview
This track addresses connectivity issues with the GitHub API integration in the deployed Cloudflare environment. The current architecture (likely using Pages Functions) is failing, so we will implement a standalone Cloudflare Worker dedicated to securely proxying requests to the GitHub API using a Personal Access Token (PAT).

## Goals
- Restore reliable fetching of GitHub repositories and statistics.
- Ensure the GitHub Personal Access Token (PAT) remains secure and is never exposed to the client.
- Decouple the API proxy logic from the frontend Pages deployment for better maintainability.

## Functional Requirements
- **Proxy Endpoint:** Create a Cloudflare Worker that listens for incoming requests and forwards them to the corresponding GitHub API endpoints.
- **Authentication:** The Worker must automatically inject the `Authorization: token <VITE_GITHUB_PAT>` header into all outgoing requests to GitHub.
- **Caching:** Implement basic caching strategies within the Worker to optimize performance and minimize GitHub API rate limit consumption.
- **Frontend Integration:** Update the frontend service calls (e.g., in `src/services/api/github.ts`) to point to the new standalone Worker URL.

## Non-Functional Requirements
- **Security:** Use Cloudflare Secrets to store the GitHub PAT securely within the Worker environment.
- **Performance:** Ensure low latency for proxied requests.
- **Reliability:** Handle GitHub API errors gracefully and return appropriate status codes to the frontend.

## Acceptance Criteria
- [ ] A standalone Cloudflare Worker is deployed and accessible.
- [ ] The Worker correctly forwards requests to `api.github.com`.
- [ ] The portfolio frontend successfully fetches data through the new Worker.
- [ ] No 404 or 500 errors are returned for GitHub-related data in the production environment.
- [ ] The GitHub PAT is verified to be secure and hidden from client-side network inspection.

## Out of Scope
- Redesigning the GitHub stats or repository components in the frontend.
- Implementing advanced analytics or logging within the Worker (beyond basic error handling).
