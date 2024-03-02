import "./tab.styles.scss";

import { useState } from "react";
import clsx from "clsx";

interface Tab {
  key: string;
  name: string;
  value: string;
}

export interface TabProps {
  tabList: Tab[];
  onTabClick?: (value: any) => void;
}

export const Tab = ({ tabList, onTabClick }: TabProps) => {
  const [activeTab, setActiveTab] = useState(tabList[0].value);

  const handleClick = (value: string) => {
    setActiveTab(value);
    onTabClick && onTabClick(value);
  };

  if (!tabList?.length) {
    return <></>;
  }

  return (
    <div className="tab">
      {tabList.map((item) => (
        <div
          className={clsx("tab-item", item.value === activeTab && "active")}
          key={item.key}
          onClick={() => handleClick(item.value)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
