import { HTMLAttributes, ReactNode } from "react";
import "./statistics-box.styles.scss";
import clsx from "clsx";

export interface StatisticsBoxProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  statistic: string;
  icon: ReactNode;
}

export const StatisticsBox = ({
  icon,
  statistic,
  title,
  ...props
}: StatisticsBoxProps) => {
  return (
    <div className={clsx("statistics-box", title.toLowerCase())} {...props}>
      <p className="box-title">{title}</p>
      <div className="box-content">
        {icon}
        <span className="highlight">{statistic}</span>
      </div>
    </div>
  );
};
