import { lazyLoad } from "@/utils";

export const DetailPage = lazyLoad(
  () => import("./detail-page"),
  (module) => module.DetailPage
);
