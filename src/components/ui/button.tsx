import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

/**
 * Button variants configuration using class-variance-authority.
 */
const buttonVariants = cva("btn",
  {
    variants: {
      variant: {
        default: "btn--primary",
        destructive: "btn--destructive",
        outline: "btn--outline",
        secondary: "btn--secondary",
        ghost: "btn--ghost",
        link: "btn--link",
      },
      size: {
        default: "btn--default",
        sm: "btn--sm",
        lg: "btn--lg",
        icon: "btn--icon",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Properties for the Button component.
 */
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, the button will render as its child component while maintaining styles.
   * Useful for using the button as a link or other element.
   * @default false
   */
  asChild?: boolean;
}

/**
 * A versatile button component with multiple variants and sizes.
 * Built on Radix UI's Slot primitive for flexible rendering.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
