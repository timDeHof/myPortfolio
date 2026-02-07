import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import AnimatedIcon from "../../../src/components/common/animated-icon";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    motion: {
      div: ({ children, className, style, ...props }: any) => (
        <div className={className} style={style} {...props}>
          {children}
        </div>
      ),
    },
    useReducedMotion: () => false,
  };
});

// Mock internal intersection observer hook
vi.mock("../../../src/hooks/use-intersection-observer", () => ({
  useIntersectionObserver: () => ({
    ref: { current: null },
    isIntersecting: true,
  }),
}));

const MockIcon = ({ size }: { size?: number }) => <svg data-testid="mock-icon" width={size} height={size} />;

describe("AnimatedIcon", () => {
  const defaultProps = {
    item: {
      Icon: MockIcon,
      x: "10%",
      y: "20%",
    },
    animationProps: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.1 },
    },
    className: "test-class",
    size: 24,
  };

  it("renders the icon component", () => {
    render(<AnimatedIcon {...defaultProps} />);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("applies className and positioning style", () => {
    render(<AnimatedIcon {...defaultProps} />);
    const container = screen.getByTestId("mock-icon").closest("div");
    expect(container).toHaveClass("test-class");
    expect(container).toHaveStyle({ left: "10%", top: "20%" });
  });

  it("returns null if no icon is provided", () => {
    const { container } = render(<AnimatedIcon {...defaultProps} item={{}} />);
    expect(container.firstChild).toBeNull();
  });
});
