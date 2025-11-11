import { lazyLoad } from "@/core/utils";

export const Tab = lazyLoad(
  () => import("./Tab"),
  (module) => module.Tab
);

export type * from "./Tab";
