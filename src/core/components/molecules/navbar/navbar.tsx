import "./navbar.styles.scss";

import { useState, useCallback } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoMenu, IoClose } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Search, SearchProps, Tab, TabProps } from "@/core/components";
import type { MovieListType } from "@/core/domains/types";
import { TAB_LIST } from "@/constants";

export interface NavbarProps extends Partial<SearchProps> {
  isBack?: boolean;
  tabList?: TabProps["tabList"];
  onTabClick?: TabProps["onTabClick"];
}

export const Navbar = ({
  isBack,
  onSearchChange: onSearchChangeProps,
  tabList = TAB_LIST,
  onTabClick: onTabClickProps,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Handle search changes
  const handleSearch = useCallback(
    (keyword: string) => {
      if (keyword) {
        setSearchParams({ search: keyword });
      } else {
        setSearchParams({});
      }
      // Call prop callback if provided
      onSearchChangeProps?.(keyword);
    },
    [setSearchParams, onSearchChangeProps]
  );

  // Handle tab clicks
  const handleTabClick = useCallback(
    (type: MovieListType) => {
      setSearchParams({});
      setIsMenuOpen(false);
      // Call prop callback if provided
      onTabClickProps?.(type);
    },
    [setSearchParams, onTabClickProps]
  );

  const searchQuery = searchParams.get("search") || "";

  return (
    <nav className="navbar">
      <div className="content">
        <div className="navbar__left">
          {isBack ? (
            <div className="back-icon" onClick={handleBack}>
              <IoIosArrowBack />
            </div>
          ) : (
            <>
              {/* Desktop Tab View */}
              <div className="left-section">
                {tabList && tabList.length > 0 && (
                  <Tab tabList={tabList} onTabClick={handleTabClick} />
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

        <div className="navbar__search">
          <Search onSearchChange={handleSearch} />
        </div>
      </div>
    </nav>
  );
};
