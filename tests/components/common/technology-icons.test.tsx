import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import * as Icons from "../../../src/components/common/technology-icons";

describe("TechnologyIcons", () => {
  it("renders ReactIcon with correct size and className", () => {
    const { container } = render(<Icons.ReactIcon size={48} className="custom-icon" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "48");
    expect(svg).toHaveAttribute("height", "48");
    // Some icons use className on svg, others on a path. 
    // Standardizing this will be part of the task.
  });

  it("renders TypeScriptIcon correctly", () => {
    render(<Icons.TypeScriptIcon size={32} />);
    expect(screen.getByLabelText("TypeScript")).toBeInTheDocument();
  });

  it("renders NextJSIcon correctly", () => {
    const { container } = render(<Icons.NextJSIcon size={20} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "20");
  });
});
