import { render, screen } from "@testing-library/react";
// tests/components/common/theme-toggle.test.tsx
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { ThemeToggle } from "../../../src/components/common/theme-toggle";

// Mock the useTheme hook
vi.mock("../../../src/hooks/use-theme", () => ({
  useTheme: () => ({
    theme: "light",
    toggleTheme: vi.fn(),
  }),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, initial, animate, exit, transition, ...props }: { children: React.ReactNode;[key: string]: any }) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe("themeToggle Component", () => {
  it("renders theme toggle button", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("has proper aria-label", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("has tooltip element", () => {
    render(<ThemeToggle />);
    const tooltip = screen.getByText("Switch to dark mode");
    expect(tooltip).toBeInTheDocument();
  });

  it("button has proper classes", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("relative");
    expect(button).toHaveClass("p-2");
  });
});
