import { lazyLoad } from "@/utils";

export const Genre = lazyLoad(
  () => import("./genre"),
  (module) => module.Genre
);
