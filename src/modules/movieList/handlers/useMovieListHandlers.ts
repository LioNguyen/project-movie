/**
 * Movie List Handlers
 *
 * This file encapsulates all event handlers and business logic for the MovieList component.
 * Following the module-based architecture pattern for better separation of concerns.
 */

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { MovieListType } from "@/core/domains/types";
import { useMoviePrefetch } from "@/core/hooks/useMovieService";

interface UseMovieListHandlersProps {
  setSearchQuery: (query: string) => void;
  setListType: (
    type: "now_playing" | "top_rated" | "upcoming" | "search"
  ) => void;
  setCurrentPage: (page: number) => void;
  setSelectedGenreId: (id: number | null) => void;
  setViewType: (type: "grid" | "list") => void;
}

/**
 * Custom hook that provides all handlers for MovieList component
 */
export const useMovieListHandlers = ({
  setSearchQuery,
  setListType,
  setCurrentPage,
  setSelectedGenreId,
  setViewType,
}: UseMovieListHandlersProps) => {
  const navigate = useNavigate();
  const { prefetchMovie } = useMoviePrefetch();

  /**
   * Handle search query changes
   * Resets to first page and clears genre filter
   */
  const handleSearch = useCallback(
    (keyword: string) => {
      setSearchQuery(keyword);
      setListType(keyword ? "search" : "now_playing");
      setCurrentPage(1);
      setSelectedGenreId(null);
    },
    [setSearchQuery, setListType, setCurrentPage, setSelectedGenreId]
  );

  /**
   * Handle movie list type changes (now playing, top rated, upcoming)
   * Resets search query, page, and genre filter
   */
  const handleListTypeChange = useCallback(
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
    },
    [setSearchQuery, setListType, setCurrentPage, setSelectedGenreId]
  );

  /**
   * Handle genre filter click
   * Resets to first page and clears search query
   */
  const handleGenreClick = useCallback(
    (genreId: number) => {
      setSelectedGenreId(genreId);
      setCurrentPage(1);
      setSearchQuery("");
    },
    [setSelectedGenreId, setCurrentPage, setSearchQuery]
  );

  /**
   * Handle view type toggle (grid/list)
   */
  const handleViewChange = useCallback(
    (type: "grid" | "list") => {
      setViewType(type);
    },
    [setViewType]
  );

  /**
   * Handle pagination changes
   * Scrolls to top on page change
   */
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setCurrentPage]
  );

  /**
   * Handle movie card click
   * Navigates to detail page and prefetches data
   */
  const handleMovieClick = useCallback(
    (id: string) => {
      // Navigate immediately for better UX
      navigate(`/${id}`);

      // Prefetch movie data in background
      prefetchMovie(id);
    },
    [navigate, prefetchMovie]
  );

  return {
    handleSearch,
    handleListTypeChange,
    handleGenreClick,
    handleViewChange,
    handlePageChange,
    handleMovieClick,
  };
};
