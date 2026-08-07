import { LoadingSpinner } from "./loading-spinner";

interface PageLoaderProps {
  size?: "sm" | "md" | "lg";
}

export function PageLoader({ size = "lg" }: PageLoaderProps) {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center" role="status" aria-label="Loading">
      <LoadingSpinner size={size} />
    </div>
  );
}
