import { lazyLoad } from "@/core/utils";

export const MovieCard = lazyLoad(
  () => import("./MovieCard"),
  (module) => module.MovieCard
);
