import { lazyLoad } from "@/utils";

export const Navbar = lazyLoad(
  () => import("./navbar"),
  (module) => module.Navbar
);

export type * from "./navbar";
