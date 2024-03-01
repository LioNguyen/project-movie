import "./search.styles.scss";

import { IoIosSearch } from "react-icons/io";

export const Search = () => {
  return (
    <div className="search">
      <input placeholder="Search movie" />
      <IoIosSearch />
    </div>
  );
};
