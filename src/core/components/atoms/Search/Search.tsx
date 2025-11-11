import "./Search.styles.scss";

import { ChangeEvent } from "react";
import { IoIosSearch } from "react-icons/io";

import { DEBOUNCE_DELAY } from "@/constants";
import { debounce } from "@/core/utils";

export interface SearchProps {
  onSearchChange?: (value: string) => void;
}

export const Search = ({ onSearchChange }: SearchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange && onSearchChange(e.target.value);
  };

  return (
    <div className="search">
      <input
        placeholder="Search movie"
        onChange={debounce(handleChange, DEBOUNCE_DELAY)}
      />
      <IoIosSearch />
    </div>
  );
};
