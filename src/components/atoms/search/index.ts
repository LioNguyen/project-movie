import { lazyLoad } from "@/utils";

export const Search = lazyLoad(
  () => import("./search"),
  (module) => module.Search
);
