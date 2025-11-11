import { lazyLoad } from "@/core/utils";

export const Toast = lazyLoad(
  () => import("./Toast"),
  (module) => module.Toast
);
