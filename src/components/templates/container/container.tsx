import "./container.styles.scss";

import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Container = ({ children }: Props) => {
  return <div className="container">{children}</div>;
};
