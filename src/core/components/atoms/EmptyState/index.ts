import { lazyLoad } from "@/core/utils";

export const EmptyState = lazyLoad(
  () => import("./EmptyState"),
  (module) => module.EmptyState
);
