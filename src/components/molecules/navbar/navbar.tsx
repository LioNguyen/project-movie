import { Search, SearchProps } from "@/components";
import "./navbar.styles.scss";

interface NavbarProps extends SearchProps {}

export const Navbar = ({ onSearchChange }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div></div>
      <Search onSearchChange={onSearchChange} />
    </nav>
  );
};
