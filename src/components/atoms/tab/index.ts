import { lazyLoad } from "@/utils";

export const Tab = lazyLoad(
  () => import("./tab"),
  (module) => module.Tab
);

export type * from "./tab";
