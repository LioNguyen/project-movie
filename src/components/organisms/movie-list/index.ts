import { lazyLoad } from "@/utils";

export const MovieList = lazyLoad(
  () => import("./movie-list"),
  (module) => module.MovieList
);

export type * from "./movie-list";
