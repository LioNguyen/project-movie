import "./navbar.styles.scss";

import { IoIosArrowBack } from "react-icons/io";

import { Search, SearchProps, Tab, TabProps } from "@/core/components";

export interface NavbarProps extends SearchProps {
  onBack?: () => void;
  tabList?: TabProps["tabList"];
  onTabClick?: TabProps["onTabClick"];
}

export const Navbar = ({
  onBack,
  onSearchChange,
  tabList,
  onTabClick,
}: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="content">
        {onBack ? (
          <div className="back-icon" onClick={onBack}>
            <IoIosArrowBack />
          </div>
        ) : (
          <div className="left-section">
            {tabList && tabList.length > 0 && (
              <Tab tabList={tabList} onTabClick={onTabClick} />
            )}
          </div>
        )}

        {onSearchChange && <Search onSearchChange={onSearchChange} />}
      </div>
    </nav>
  );
};
