import { Skeleton } from "@/core/components";

export const MovieListSkeleton = () => {
  return (
    <div className="skeleton-loading">
      {Array(12)
        .fill(1)
        .map((_, index) => (
          <Skeleton key={index} />
        ))}
    </div>
  );
};
