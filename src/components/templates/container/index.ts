import { lazyLoad } from "@/utils";

export const Container = lazyLoad(
  () => import("./container"),
  (module) => module.Container
);
