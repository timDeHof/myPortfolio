import { LoadingSpinner } from "./loading-spinner";

interface PageLoaderProps {
  size?: "sm" | "md" | "lg";
}

export const PageLoader = ({ size = "lg" }: PageLoaderProps) => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size={size} />
  </div>
);
