import { lazyLoad } from "@/utils";

export const HomePage = lazyLoad(
  () => import("./home-page"),
  (module) => module.HomePage
);
