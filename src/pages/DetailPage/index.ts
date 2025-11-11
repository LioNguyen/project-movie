import { lazyLoad } from "@/core/utils";

export const DetailPage = lazyLoad(
  () => import("./DetailPage"),
  (module) => module.DetailPage
);
