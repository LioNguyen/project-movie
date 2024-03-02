import { lazyLoad } from "@/utils";

export const StatisticsBox = lazyLoad(
  () => import("./statistics-box"),
  (module) => module.StatisticsBox
);

export type * from "./statistics-box";
