import { RepositorySkeletonGrid } from "../common/repository-card-skeleton";

export function LoadingState() {
  return (
    <>
      <div className="text-center mb-8">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Loading repositories from GitHub...
        </p>
      </div>
      <RepositorySkeletonGrid count={6} />
    </>
  );
}
