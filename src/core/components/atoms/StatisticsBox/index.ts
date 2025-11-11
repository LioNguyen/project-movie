import { lazyLoad } from "@/core/utils";

export const StatisticsBox = lazyLoad(
  () => import("./StatisticsBox"),
  (module) => module.StatisticsBox
);

export type * from "./StatisticsBox";
