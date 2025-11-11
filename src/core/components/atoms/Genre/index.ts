import { lazyLoad } from "@/core/utils";

export const Genre = lazyLoad(
  () => import("./Genre"),
  (module) => module.Genre
);
