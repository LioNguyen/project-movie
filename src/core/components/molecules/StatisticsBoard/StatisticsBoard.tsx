import "./StatisticsBoard.styles.scss";

import { HTMLAttributes } from "react";

import { StatisticsBox, StatisticsBoxProps } from "@/core/components";

interface Props extends HTMLAttributes<HTMLDivElement> {
  statisticsList: StatisticsBoxProps[];
}

export const StatisticsBoard = ({ statisticsList }: Props) => {
  if (!statisticsList.length) {
    return <></>;
  }

  return (
    <div className="statistics-board">
      {statisticsList.map((item: StatisticsBoxProps) => (
        <StatisticsBox
          key={item.title}
          title={item.title}
          statistic={item.statistic}
          icon={item.icon}
        />
      ))}
    </div>
  );
};
