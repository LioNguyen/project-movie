import "./search.styles.scss";

import { IoIosSearch } from "react-icons/io";
import { ChangeEvent } from "react";

import { debounce } from "@/utils";

export interface SearchProps {
  onSearchChange: (value: string) => void;
}

export const Search = ({ onSearchChange }: SearchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange && onSearchChange(e.target.value);
  };

  return (
    <div className="search">
      <input
        placeholder="Search movie"
        onChange={debounce(handleChange, 500)}
      />
      <IoIosSearch />
    </div>
  );
};
