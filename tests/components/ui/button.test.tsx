import { render, screen } from "@testing-library/react";
import React from "react";
// tests/components/ui/button.test.tsx
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../../src/components/ui/button";

describe("button Component", () => {
  it("renders with default variant", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn--primary");
  });

  it("renders with destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("btn--destructive");
  });

  it("renders with outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button", { name: /outline/i });
    expect(button).toHaveClass("btn--outline");
  });

  it("renders with different sizes", () => {
    render(
      <div>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>,
    );
    expect(screen.getByRole("button", { name: /small/i })).toHaveClass("btn--sm");
    expect(screen.getByRole("button", { name: /default/i })).toHaveClass("btn--default");
    expect(screen.getByRole("button", { name: /large/i })).toHaveClass("btn--lg");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const button = screen.getByRole("button", { name: /clickable/i });
    button.click();
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it("renders as a different element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("btn--primary");
    expect(link).not.toBeInstanceOf(HTMLButtonElement);
  });
});
