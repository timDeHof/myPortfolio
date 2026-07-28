import * as React from "react";

import { cn } from "../../lib/utils";

/**
 * A basic card container component.
 */
function Card({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className,
      )}
      {...props}
    />
  );
}
Card.displayName = "Card";

/**
 * Header section of a card, typically contains the title and description.
 */
function CardHeader({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}
CardHeader.displayName = "CardHeader";

/**
 * Title component for a card.
 */
function CardTitle({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}
CardTitle.displayName = "CardTitle";

/**
 * Description component for a card, providing additional context.
 */
function CardDescription({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
CardDescription.displayName = "CardDescription";

/**
 * The main content area of a card.
 */
function CardContent({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
}
CardContent.displayName = "CardContent";

/**
 * Footer section of a card, typically contains actions.
 */
function CardFooter({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
