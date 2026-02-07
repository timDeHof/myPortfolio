import { cn } from "../../lib/utils";

/**
 * Properties for the MaxWidthWrapper component.
 */
interface MaxWidthWrapperProps {
  /**
   * Optional CSS class name for the wrapper element.
   */
  className?: string;
  /**
   * Content to be rendered inside the wrapper.
   */
  children: React.ReactNode;
}

/**
 * A utility component that constrains content width and centers it.
 * Used for maintaining consistent page margins and alignment.
 */
export const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn(
      "mx-auto h-full w-full max-w-screen-2xl px-2.5 md:px-20",
      className,
    )}
    >
      {children}
    </div>
  );
};
