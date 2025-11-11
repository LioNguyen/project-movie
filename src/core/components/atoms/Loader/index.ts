import { lazyLoad } from "@/core/utils";

export const Loader = lazyLoad(
  () => import("./Loader"),
  (module) => module.Loader
);
