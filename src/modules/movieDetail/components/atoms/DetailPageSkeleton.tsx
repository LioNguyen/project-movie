import { FC } from "react";

import { Container, Skeleton } from "@/core/components";

interface DetailPageSkeletonProps {}

export const DetailPageSkeleton: FC<DetailPageSkeletonProps> = () => {
  return (
    <Container id="detail-skeleton" style={{ minHeight: "calc(100vh - 80px)" }}>
      <div style={{ animation: "fadeIn 0.3s ease-in-out" }}>
        <Skeleton
          variant="text"
          height={40}
          width="30%"
          style={{ marginBottom: "1.5rem" }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="card" height={80} />
          ))}
        </div>

        <Skeleton
          variant="card"
          height={300}
          style={{ marginBottom: "2rem" }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "1rem",
          }}
        >
          {Array(8)
            .fill(1)
            .map((_, i) => (
              <Skeleton key={i} variant="card" height={200} />
            ))}
        </div>
      </div>
    </Container>
  );
};
