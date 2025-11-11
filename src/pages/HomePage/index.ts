import { lazyLoad } from "@/core/utils";

export const HomePage = lazyLoad(
  () => import("./HomePage"),
  (module) => module.HomePage
);
