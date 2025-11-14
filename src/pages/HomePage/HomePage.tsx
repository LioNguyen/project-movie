import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Navbar } from "@/core/components";
import { MovieList } from "@/modules/movieList/components";
import type { MovieListType } from "@/core/domains/types";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Shared state between Navbar and MovieList
  const [listType, setListType] = useState<
    "now_playing" | "top_rated" | "upcoming" | "search"
  >("now_playing");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  /**
   * Handle search from Navbar
   * Updates search query and resets filters
   */
  const handleSearchChange = useCallback(
    (keyword: string) => {
      setSearchQuery(keyword);
      setListType(keyword ? "search" : "now_playing");
      setCurrentPage(1);
      setSelectedGenreId(null);

      // Update URL params
      if (keyword) {
        setSearchParams({ search: keyword });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams]
  );

  /**
   * Handle tab click from Navbar
   * Updates list type and clears search/filters
   */
  const handleTabClick = useCallback(
    (type: MovieListType) => {
      setSearchQuery("");
      const newType =
        type === "NOW_PLAYING"
          ? "now_playing"
          : type === "TOP_RATED"
          ? "top_rated"
          : type === "UPCOMING"
          ? "upcoming"
          : "now_playing";
      setListType(newType);
      setCurrentPage(1);
      setSelectedGenreId(null);

      // Clear URL params when changing tabs
      setSearchParams({});
    },
    [setSearchParams]
  );

  // Sync with URL params on mount
  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam && searchQuery !== searchParam) {
      setSearchQuery(searchParam);
      setListType("search");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  return (
    <>
      <Navbar onSearchChange={handleSearchChange} onTabClick={handleTabClick} />
      <MovieList
        listType={listType}
        searchQuery={searchQuery}
        currentPage={currentPage}
        selectedGenreId={selectedGenreId}
        onListTypeChange={setListType}
        onSearchQueryChange={setSearchQuery}
        onPageChange={setCurrentPage}
        onGenreIdChange={setSelectedGenreId}
      />
    </>
  );
};
