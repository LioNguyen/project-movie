import { lazyLoad } from "@/core/utils";

export const Container = lazyLoad(
  () => import("./container"),
  (module) => module.Container
);
