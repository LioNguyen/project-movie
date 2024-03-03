import { lazyLoad } from "@/utils";

export const EmptyState = lazyLoad(
  () => import("./empty-state"),
  (module) => module.EmptyState
);
