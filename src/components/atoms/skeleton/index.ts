import { lazyLoad } from "@/utils";

export const Skeleton = lazyLoad(
  () => import("./skeleton"),
  (module) => module.Skeleton
);
