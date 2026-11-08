import { render, screen } from "@testing-library/react";
// tests/components/common/loading-spinner.test.tsx
import { describe, expect, it } from "vitest";

import { LoadingSpinner } from "../../../src/components/common/loading-spinner";

describe("loadingSpinner Component", () => {
  it("renders loading spinner", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders with default size", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId("loading-spinner");
    const motionDiv = spinner.querySelector("div");
    expect(motionDiv).toHaveClass("w-8 h-8");
  });

  it("renders with custom size", () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = screen.getByTestId("loading-spinner");
    const motionDiv = spinner.querySelector("div");
    expect(motionDiv).toHaveClass("w-12 h-12");
  });

  it("renders with custom color", () => {
    render(<LoadingSpinner color="teal" />);
    const spinner = screen.getByTestId("loading-spinner");
    const motionDiv = spinner.querySelector("div");
    expect(motionDiv).toHaveClass("border-t-teal-600");
  });
});
