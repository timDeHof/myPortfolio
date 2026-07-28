import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { MaxWidthWrapper } from "../../../src/components/ui/max-width-wrapper";

describe("maxWidthWrapper", () => {
  it("renders children and applies base classes", () => {
    render(
      <MaxWidthWrapper>
        <div data-testid="child">Content</div>
      </MaxWidthWrapper>,
    );

    const wrapper = screen.getByTestId("child").parentElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("mx-auto h-full w-full max-w-screen-2xl px-2.5 md:px-20");
  });

  it("applies custom className", () => {
    render(
      <MaxWidthWrapper className="custom-class">
        <div>Content</div>
      </MaxWidthWrapper>,
    );

    const wrapper = screen.getByText("Content").parentElement;
    expect(wrapper).toHaveClass("custom-class");
  });
});
