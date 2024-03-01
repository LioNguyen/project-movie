import "./tab.styles.scss";

interface Tab {
  key: string;
  name: string;
  value: string;
}

export interface TabProps {
  activeTab: string;
  tabList: Tab[];
  onTabClick?: (value: any) => void;
}

export const Tab = ({ activeTab, tabList, onTabClick }: TabProps) => {
  const handleClick = (value: string) => {
    onTabClick && onTabClick(value);
  };
  if (!tabList?.length) {
    return <></>;
  }
  return (
    <div className="tab">
      {tabList.map((item) => (
        <div
          className={`tab-item ${item.value === activeTab ? "active" : ""}`}
          key={item.key}
          onClick={() => handleClick(item.value)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
