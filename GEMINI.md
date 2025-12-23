# Project Overview

This is a modern, responsive portfolio website for Tim DeHof, a full-stack developer. It is built with React, TypeScript, and Tailwind CSS, and it showcases his projects, services, and contact information. The application is a single-page application (SPA) that uses React Router for navigation and features a clean, professional design with smooth animations and transitions.

## Key Technologies

- **Frontend:** React, TypeScript, Tailwind CSS
- **Build Tool:** Vite
- **State Management:** Zustand
- **Data Fetching:** React Query
- **Animations:** Framer Motion
- **Routing:** React Router
- **Styling:** Radix UI, Lucide React
- **Linting:** ESLint
- **Testing:** Vitest

## Architecture

The project follows a component-based architecture with a clear separation of concerns. The main components are:

- **`src/pages`:** Contains the top-level components for each page of the application (e.g., `HomePage`, `ProjectsPage`).
- **`src/components`:** Contains reusable UI components, organized by feature (e.g., `home`, `projects`, `layout`).
- **`src/services`:** Contains modules for interacting with external APIs, such as the GitHub API.
- **`src/hooks`:** Contains custom React hooks for managing state and side effects.
- **`src/store`:** Contains the Zustand store for global state management.
- **`src/lib`:** Contains utility functions and library configurations.

## Building and Running

### Prerequisites

- Node.js (v20 or higher)
- pnpm

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your GitHub Personal Access Token (`VITE_GITHUB_PAT`) and EmailJS credentials.

### Development

To start the development server, run:

```bash
pnpm run dev
```

This will start the Vite development server and open the application in your default browser at `http://localhost:5173`.

### Building for Production

To build the application for production, run:

```bash
pnpm run build
```

This will create a `build` directory with the optimized and minified application files.

### Testing

To run the unit tests, run:

```bash
pnpm run test
```

## Development Conventions

- **Styling:** The project uses Tailwind CSS for styling, with custom components built on top of Radix UI primitives.
- **State Management:** Zustand is used for global state management, while React Query is used for managing server state (e.g., fetching data from the GitHub API).
- **Linting:** ESLint is used to enforce a consistent coding style and catch potential errors.
- **Testing:** Vitest is used for unit testing, with tests located in `__tests__` directories alongside the files they test.
- **Conventional Commits:** The project follows the Conventional Commits specification for commit messages.
