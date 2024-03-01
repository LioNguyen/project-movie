import { lazyLoad } from "@/utils";

export const MovieCard = lazyLoad(
  () => import("./movie-card"),
  (module) => module.MovieCard
);
