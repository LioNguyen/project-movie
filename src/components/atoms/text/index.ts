import { lazyLoad } from "@/utils";

export const Text = lazyLoad(
  () => import("./text"),
  (module) => module.Text
);
