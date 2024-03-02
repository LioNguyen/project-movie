import { lazyLoad } from "@/utils";

export const StatisticsBoard = lazyLoad(
  () => import("./statistics-board"),
  (module) => module.StatisticsBoard
);
