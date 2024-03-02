import { lazyLoad } from "@/utils";

export const Detail = lazyLoad(
  () => import("./detail"),
  (module) => module.Detail
);
