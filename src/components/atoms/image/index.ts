import { lazyLoad } from "@/utils";

export const Image = lazyLoad(
  () => import("./image"),
  (module) => module.Image
);
