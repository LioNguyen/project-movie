import { lazyLoad } from "@/utils";

export const Loader = lazyLoad(
  () => import("./loader"),
  (module) => module.Loader
);
