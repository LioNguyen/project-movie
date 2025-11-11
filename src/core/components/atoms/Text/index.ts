import { lazyLoad } from "@/core/utils";

export const Text = lazyLoad(
  () => import("./Text"),
  (module) => module.Text
);
