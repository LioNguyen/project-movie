import { lazyLoad } from "@/core/utils";

export const Card = lazyLoad(
  () => import("./Card"),
  (module) => module.Card
);
