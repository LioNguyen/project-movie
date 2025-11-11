import "./container.styles.scss";

import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container = ({ children, className, ...props }: Props) => {
  return (
    <div className={clsx("container", className)} {...props}>
      {children}
    </div>
  );
};
