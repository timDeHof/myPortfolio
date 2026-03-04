# AGENTS.md - Development Guidelines for Agents

This file provides guidelines for AI agents operating in this repository.

---

## 1. Build, Lint, and Test Commands

### Development
```bash
pnpm dev              # Start development server
pnpm dev:pages        # Build and run with Cloudflare Pages
```

### Building
```bash
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm preview:worker   # Preview Cloudflare Worker
```

### Testing
```bash
pnpm test             # Run all tests
pnpm test:browser     # Run browser tests with Playwright
pnpm coverage         # Run tests with coverage report

# Run a single test file
pnpm test src/services/api/__tests__/github.test.ts
pnpm test tests/components/common/animated-icon.test.tsx

# Run tests matching a pattern
pnpm test -- --run "AnimatedIcon"
pnpm test -- --run "github"
```

### Linting and Type Checking
```bash
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm type-check       # Run TypeScript type check
```

---

## 2. Code Style Guidelines

### General Principles
- Use **Antfu's ESLint config** (see `eslint.config.js`)
- Follow **TypeScript strict mode** (enabled in `tsconfig.app.json`)
- Write **self-documenting code** - avoid comments unless explaining complex logic
- Keep functions **small and focused** (single responsibility)

### Formatting (Pre-configured by Antfu)
- **Indentation**: 2 spaces
- **Quotes**: Double quotes
- **Semicolons**: Yes
- **Line length**: Let ESLint handle it
- Use **ESLint auto-fix** (`pnpm lint:fix`) before committing

---

## 3. Import Conventions

### Path Aliases
The project uses path aliases configured in `tsconfig.app.json`:
```typescript
// Use these aliases instead of relative paths
import { Button } from "@components/ui/button";
import { useBlogPosts } from "@services/api/blog";
import { useTheme } from "@hooks/use-theme";
import { HomePage } from "@pages/home-page";
```

### Import Order (Enforced by ESLint)
1. React/Node built-ins
2. External libraries (react, framer-motion, lucide-react)
3. Internal aliases (@components, @hooks, @pages, @services)
4. Relative imports
5. Type imports

```typescript
// Example import order
import { useState, useEffect } from "react";           // React
import { m } from "framer-motion";                     // External
import { Calendar, ExternalLink } from "lucide-react";  // External
import { Button } from "@components/ui/button";        // Alias
import { Card, CardContent } from "@components/ui/card"; // Alias
import type { BlogPost } from "../../services/api/blog"; // Relative
```

### Named vs Default Exports
- **Prefer named exports** for components, hooks, and utilities
- Default exports are acceptable for page components (e.g., `export default BlogPage`)

---

## 4. TypeScript Guidelines

### Strict Mode
All TypeScript code must pass strict mode:
```typescript
// Always define return types for async functions
export const fetchBlogPosts = async (): Promise<BlogPost[]> => { ... }

// Use explicit types for props interfaces
interface BlogPostCardProps {
  post: BlogPost;
  index?: number;  // Optional props at the end
}
```

### Type Definitions
- Put types in `src/types/` directory
- Use interfaces for public APIs, types for unions/intersections
- Export types that are used across modules

```typescript
// src/types/project.ts
export interface Project {
  slug: string;
  name: string;
  // ...
}
```

### Generics
Use generics when creating reusable components:
```typescript
function useQuery<T>({
  queryKey,
  queryFn,
}: {
  queryKey: string[];
  queryFn: () => Promise<T>;
}): QueryResult<T> { ... }
```

---

## 5. Naming Conventions

### Files
- **Components**: PascalCase (`BlogPostCard.tsx`, `ProjectGrid.tsx`)
- **Hooks**: camelCase with `use` prefix (`useBlogPosts.ts`, `useTheme.ts`)
- **Utils**: camelCase (`cn.ts`, `validation.ts`)
- **Types**: PascalCase (`project.ts`, `index.ts`)
- **Tests**: Same as file + `.test.tsx` suffix

### Variables and Functions
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE for true constants, camelCase otherwise
- **Functions**: camelCase, verb-prefixed for actions (`fetchBlogPosts`, `useBlogPost`)
- **Booleans**: Use `is`, `has`, `can` prefixes (`isLoading`, `hasError`, `canEdit`)

### React Components
```typescript
// Component file: BlogPostCard.tsx
export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index = 0 }) => { ... }

// Or using newer React 19 style (no explicit type needed)
export function BlogPostCard({ post, index = 0 }: BlogPostCardProps) { ... }
```

---

## 6. Error Handling

### API Error Handling
Use custom error classes and proper error typing:
```typescript
// Custom error class
export class GitHubAPIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public url: string,
    message?: string,
  ) {
    super(message || `GitHub API Error: ${status} ${statusText}`);
    this.name = "GitHubAPIError";
  }
}

// Usage
try {
  const data = await fetchData();
} catch (error) {
  if (error instanceof GitHubAPIError) {
    console.error(`API Error: ${error.status} - ${error.message}`);
  }
  throw error;
}
```

### React Query Error Handling
```typescript
const { data, isLoading, error, isError } = useBlogPosts();

if (isError) {
  return (
    <div>
      <p>Failed to load: {error instanceof Error ? error.message : "Unknown error"}</p>
    </div>
  );
}
```

### Environment Variables
Use Zod for environment validation:
```typescript
// src/lib/env.ts
import { z } from "zod";

const EnvSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_NODE_ENV: z.string().default("development"),
});

export const env = EnvSchema.parse(import.meta.env);
```

---

## 7. Component Patterns

### Component Structure
```typescript
import { m } from "framer-motion";  // Animations
import { Calendar } from "lucide-react";  // Icons

import { Button } from "@components/ui/button";  // Internal UI
import { Card, CardContent } from "@components/ui/card";  // Internal UI

import type { BlogPost } from "../../services/api/blog";  // Types

interface ComponentNameProps {
  requiredProp: string;
  optionalProp?: number;
  onAction?: () => void;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  requiredProp,
  optionalProp = 0,
  onAction,
}) => {
  // Hooks first
  const { data } = useSomeHook();

  // Early returns
  if (!data) return <Skeleton />;

  // Render
  return (
    <Card>
      <CardContent>
        <h3>{requiredProp}</h3>
      </CardContent>
    </Card>
  );
};
```

### Props with Multiple Optional Props
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}
```

---

## 8. Testing Guidelines

### Test File Location
- Unit tests: `src/services/api/__tests__/filename.test.ts`
- Component tests: `tests/components/path/ComponentName.test.tsx`

### Test Patterns
```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("ComponentName", () => {
  // Mock dependencies
  vi.mock("framer-motion", async () => {
    const actual = await vi.importActual("framer-motion");
    return {
      ...actual,
      motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      },
    };
  });

  const defaultProps = { /* ... */ };

  it("renders correctly", () => {
    render(<ComponentName {...defaultProps} />);
    expect(screen.getByText("Expected")).toBeInTheDocument();
  });

  it("handles optional props", () => {
    render(<ComponentName {...defaultProps} optionalProp={5} />);
    // assertions
  });
});
```

### Testing Hooks
```typescript
import { renderHook, waitFor } from "@testing-library/react";
import { useBlogPosts } from "../../services/api/blog";

it("fetches blog posts", async () => {
  const { result } = renderHook(() => useBlogPosts());

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.data).toHaveLength(3);
});
```

---

## 9. Git Submodule (Blog Content)

The blog posts are loaded from a git submodule at `src/content/blog/`.

### Updating Blog Posts
```bash
# Pull latest from blog submodule
git submodule update --remote src/content/blog

# Or run prepare script
pnpm prepare
```

### Build Requirements
The submodule must be initialized before building:
```bash
pnpm install    # Runs prepare script via pnpm
```

---

## 10. Key Libraries and Patterns

### State Management
- **Zustand** for global state: `src/store/use-app-store.ts`
- **TanStack Query** for server state: Use `useQuery` hooks

### UI Components
- **shadcn/ui** pattern with Radix UI primitives
- **Tailwind CSS** for styling (v4)
- **Framer Motion** for animations

### Data Fetching
- **TanStack Query** (`@tanstack/react-query`)
- Custom query keys pattern:
```typescript
export const blogKeys = {
  all: ["blog"] as const,
  posts: () => [...blogKeys.all, "posts"] as const,
  post: (slug: string) => [...blogKeys.all, "post", slug] as const,
};
```

---

## 11. Common Patterns

### Lazy Loading Pages
```typescript
// src/App.tsx
const BlogPage = lazy(() => import("./pages/blog-page").then(module => ({ default: module.BlogPage })));

// Route
<Route path="blog" element={<BlogPage />} />
```

### SEO Head
```typescript
import { SEOHead } from "../components/common/seo-head";
import { pageSEO } from "../utils/seo";

// Usage
<SEOHead seo={pageSEO.blog} />
```

### Animated Sections
```typescript
import { AnimatedSection } from "@components/common/animated-section";

<AnimatedSection className="py-20">
  Content here
</AnimatedSection>
```

---

## 12. When in Doubt

1. **Run lint and type-check** before committing: `pnpm lint:fix && pnpm type-check`
2. **Look at existing code** for patterns - the codebase is consistent
3. **Check ESLint config** in `eslint.config.js` for specific rules
4. **Run tests** to ensure changes don't break existing functionality

---

Last updated: 2026-03-04
