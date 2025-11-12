import { HTMLAttributes } from "react";
import "./Skeleton.styles.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?: "card" | "text" | "avatar";
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({
  variant = "card",
  width,
  height,
  ...props
}: Props) => {
  const style = {
    width: width || undefined,
    height: height || undefined,
    ...props.style,
  };

  return (
    <div
      className={`skeleton skeleton--${variant}`}
      style={style}
      {...props}
    ></div>
  );
};
