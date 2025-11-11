import { lazyLoad } from "@/core/utils";

export const Image = lazyLoad(
  () => import("./Image"),
  (module) => module.Image
);
