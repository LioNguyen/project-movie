import "./MovieList.styles.scss";

import { memo, useState } from "react";

import { Container, EmptyState, ListView } from "@/core/components";
import { useAppSelector } from "@/core/hooks";
import {
  useGenresFetch,
  useMovieListFetch,
} from "@/core/hooks/useMovieService";
import { useMovieListHandlers } from "../handlers";
import { MovieListSkeleton } from "./atoms";

interface MovieListProps {
  listType: "now_playing" | "top_rated" | "upcoming" | "search";
  searchQuery: string;
  currentPage: number;
  selectedGenreId: number | null;
  onListTypeChange: (
    type: "now_playing" | "top_rated" | "upcoming" | "search"
  ) => void;
  onSearchQueryChange: (query: string) => void;
  onPageChange: (page: number) => void;
  onGenreIdChange: (id: number | null) => void;
}

export const MovieList = memo(
  ({
    listType,
    searchQuery,
    currentPage,
    selectedGenreId,
    onListTypeChange,
    onSearchQueryChange,
    onPageChange,
    onGenreIdChange,
  }: MovieListProps) => {
    const movieList = useAppSelector((state) => state.movie.movieList);
    const isLoading = useAppSelector(
      (state) => state.movie.loadingStates.movieList
    );

    const [viewType, setViewType] = useState<"grid" | "list">("grid");

    // Fetch genres using custom hook
    const { genres: storedGenres } = useGenresFetch();

    // Fetch movie list using custom hook
    useMovieListFetch({
      listType,
      searchQuery,
      currentPage,
      selectedGenreId,
    });

    // Get all handlers from custom hook
    const {
      handleGenreClick,
      handleViewChange,
      handlePageChange,
      handleMovieClick,
    } = useMovieListHandlers({
      setSearchQuery: onSearchQueryChange,
      setListType: onListTypeChange,
      setCurrentPage: onPageChange,
      setSelectedGenreId: onGenreIdChange,
      setViewType,
    });

    const listResults = movieList?.results || [];

    if (!movieList || isLoading) {
      return (
        <Container id="home">
          <MovieListSkeleton />
        </Container>
      );
    }

    if (!movieList?.results?.length) {
      return (
        <Container id="home">
          <EmptyState />
        </Container>
      );
    }

    let currentListTitle =
      movieList?.type === "SEARCH"
        ? "Search Results"
        : movieList?.type === "NOW_PLAYING"
        ? "Now Playing"
        : movieList?.type === "TOP_RATED"
        ? "Top Rated"
        : movieList?.type === "GENRE_FILTER"
        ? "Filtered by Genre"
        : "Upcoming";

    // Update title if filtering by genre
    if (selectedGenreId && storedGenres) {
      const selectedGenre = storedGenres.find(
        (g: { id: number; name: string }) => g.id === selectedGenreId
      );
      if (selectedGenre) {
        currentListTitle = `${selectedGenre.name}`;
      }
    }

    return (
      <Container id="home">
        <ListView
          title={currentListTitle}
          data={listResults}
          viewType={viewType}
          onViewChange={handleViewChange}
          onItemClick={handleMovieClick}
          onGenreClick={handleGenreClick}
          currentPage={currentPage}
          totalPages={movieList?.total_pages || 1}
          onPageChange={handlePageChange}
        />
      </Container>
    );
  }
);
