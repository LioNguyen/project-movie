import { lazyLoad } from "@/core/utils";

export const Search = lazyLoad(
  () => import("./Search"),
  (module) => module.Search
);

export type * from "./Search";
