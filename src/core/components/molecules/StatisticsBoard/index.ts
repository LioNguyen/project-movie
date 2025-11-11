import { lazyLoad } from "@/core/utils";

export const StatisticsBoard = lazyLoad(
  () => import("./StatisticsBoard"),
  (module) => module.StatisticsBoard
);
