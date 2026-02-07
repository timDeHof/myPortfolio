import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { AnimatedSection } from "../../../src/components/common/animated-section";

// Mock hooks to avoid implementation details
vi.mock("../../../src/hooks/use-intersection-observer", () => ({
  useIntersectionObserver: () => ({
    ref: { current: null },
    isIntersecting: true, // Force intersection for testing visibility
  }),
}));

vi.mock("../../../src/hooks/use-optimized-animations", () => ({
  useOptimizedAnimations: () => ({
    scheduleAnimation: vi.fn(),
  }),
}));

describe("AnimatedSection", () => {
  it("renders children correctly", () => {
    render(
      <AnimatedSection>
        <div>Test Content</div>
      </AnimatedSection>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <AnimatedSection className="custom-class">
        <div>Test Content</div>
      </AnimatedSection>
    );

    // motion.section renders as a section element
    // We can't easily check for class on motion component directly without setup, 
    // but we can check if it renders without error.
    // Ideally we'd use container query or check the element.
    const content = screen.getByText("Test Content");
    expect(content.closest("section")).toHaveClass("custom-class");
  });
});
