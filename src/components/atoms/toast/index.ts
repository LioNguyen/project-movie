import { lazyLoad } from "@/utils";

export const Toast = lazyLoad(
  () => import("./toast"),
  (module) => module.Toast
);
