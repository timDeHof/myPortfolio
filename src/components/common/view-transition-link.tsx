import type { ComponentProps } from "react";

import { forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// Helper to check if the browser supports view transitions
const isViewTransitionSupported = () => "startViewTransition" in document;

type ViewTransitionLinkProps = ComponentProps<typeof Link>;

export const ViewTransitionLink = forwardRef<HTMLAnchorElement, ViewTransitionLinkProps>(
  ({ to, onClick, ...props }, ref) => {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      // Allow default behavior for new tabs, etc.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }

      event.preventDefault();

      if (!isViewTransitionSupported()) {
        navigate(to);
      }
      else {
        document.startViewTransition(() => {
          navigate(to);
        });
      }

      // Call original onClick if it exists
      if (onClick) {
        onClick(event);
      }
    };

    return <Link ref={ref} to={to} onClick={handleClick} {...props} />;
  },
);

ViewTransitionLink.displayName = "ViewTransitionLink";
