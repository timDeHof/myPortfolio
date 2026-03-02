# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed
- Fixed 7 React Doctor warnings across 3 files:
  - Fixed array key issues in ProjectCard.tsx using stable tech names
  - Fixed 4 array key issues in project-detail-page.tsx using feature titles, step numbers, and tech names
  - Fixed skeleton loader key in ProjectGrid.tsx
  - Extracted renderTabContent inline function to separate TabContent component
  - Removed unused `setActiveImage` state variable from project-detail-page.tsx

### Enhanced
- Project detail modal with tabs (Overview, Features, Tech Stack, Workflow)
- Responsive modal design (full-screen bottom sheet on mobile, centered on desktop)
- Tab content extracted to separate components for proper reconciliation

### Added
- Created portfolio-tools monorepo for Cloudflare workers
- Created image uploader worker with Cloudflare R2 and upload dashboard

## [1.0.0] - 2024-12-04

### Added
- Initial portfolio website with Vite + React
- Project showcase with detail pages
- Responsive design with dark mode support
