import { HTMLAttributes } from "react";
import "./Skeleton.styles.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Skeleton = ({ ...props }: Props) => {
  return <div className="skeleton" {...props}></div>;
};
