import { lazyLoad } from "@/core/utils";

export const Navbar = lazyLoad(
  () => import("./navbar"),
  (module) => module.Navbar
);

export type * from "./navbar";
