import "./Search.styles.scss";

import { ChangeEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";

import { DEBOUNCE_DELAY } from "@/constants";
import { debounce } from "@/core/utils";

export interface SearchProps {
  onSearchChange?: (value: string) => void;
}

export const Search = ({ onSearchChange }: SearchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    onSearchChange && onSearchChange(e.target.value);
  };

  return (
    <div
      className={`search ${isFocused ? "focused" : ""} ${
        hasValue ? "has-value" : ""
      }`}
    >
      <IoIosSearch className="search-icon" />
      <input
        placeholder="Search movie"
        onChange={debounce(handleChange, DEBOUNCE_DELAY)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
