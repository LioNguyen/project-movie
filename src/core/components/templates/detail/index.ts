import { lazyLoad } from "@/core/utils";

export const Detail = lazyLoad(
  () => import("./detail"),
  (module) => module.Detail
);
