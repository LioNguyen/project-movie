import { lazyLoad } from "@/core/utils";

export const Skeleton = lazyLoad(
  () => import("./Skeleton"),
  (module) => module.Skeleton
);
