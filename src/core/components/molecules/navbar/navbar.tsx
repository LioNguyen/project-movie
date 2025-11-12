import "./navbar.styles.scss";

import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoMenu, IoClose } from "react-icons/io5";

import { Search, SearchProps, Tab, TabProps } from "@/core/components";
import type { MovieListType } from "@/core/domains/types";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabClick = (type: MovieListType) => {
    onTabClick?.(type);
    setIsMenuOpen(false); // Close menu after selection
  };

  return (
    <nav className="navbar">
      <div className="content">
        <div className="navbar__left">
          {onBack ? (
            <div className="back-icon" onClick={onBack}>
              <IoIosArrowBack />
            </div>
          ) : (
            <>
              {/* Desktop Tab View */}
              <div className="left-section">
                {tabList && tabList.length > 0 && (
                  <Tab tabList={tabList} onTabClick={onTabClick} />
                )}
              </div>

              {/* Mobile Hamburger Menu */}
              {tabList && tabList.length > 0 && (
                <div className="hamburger-menu">
                  <button
                    className={`hamburger-toggle ${isMenuOpen ? "active" : ""}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? <IoClose /> : <IoMenu />}
                  </button>

                  {/* Mobile Menu Dropdown */}
                  {isMenuOpen && (
                    <div className="mobile-menu-dropdown">
                      <Tab tabList={tabList} onTabClick={handleTabClick} />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {onSearchChange && (
          <div className="navbar__search">
            <Search onSearchChange={onSearchChange} />
          </div>
        )}
      </div>
    </nav>
  );
};
