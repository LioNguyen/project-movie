import "./navbar.styles.scss";

import { IoIosArrowBack } from "react-icons/io";

import { Search, SearchProps } from "@/components";

export interface NavbarProps extends SearchProps {
  onBack?: () => void;
}

export const Navbar = ({ onBack, onSearchChange }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="content">
        {onBack ? (
          <div className="back-icon" onClick={onBack}>
            <IoIosArrowBack />
          </div>
        ) : (
          <div></div>
        )}

        {onSearchChange && <Search onSearchChange={onSearchChange} />}
      </div>
    </nav>
  );
};
