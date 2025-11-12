import "./MovieList.styles.scss";

import { memo, useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { Container, EmptyState, ListView, Navbar } from "@/core/components";
import { MovieListSkeleton } from "./atoms";
import { TAB_LIST } from "@/constants";
import {
  movieKeys,
  useMovieList,
  useGenres,
  useDiscoverMovies,
} from "@/core/hooks/useMovieService";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import {
  getMovieDetail,
  getMovieImage,
  getMovieList,
  setGenres,
} from "@/core/store/movieSlice";
import type { MovieListType } from "@/core/domains/types";

export const MovieList = memo(() => {
  const dispatch = useAppDispatch();
  const movieList = useAppSelector((state) => state.movie.movieList);
  const storedGenres = useAppSelector((state) => state.movie.genres);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Fetch genres once
  const { data: genresData } = useGenres();

  useEffect(() => {
    if (genresData) {
      dispatch(setGenres(genresData));
    }
  }, [genresData, dispatch]);

  const [listType, setListType] = useState<
    "now_playing" | "top_rated" | "upcoming" | "search"
  >("now_playing");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  // Handle genre parameter from URL
  useEffect(() => {
    const genreParam = searchParams.get("genre");
    if (genreParam) {
      const genreId = parseInt(genreParam, 10);
      if (!isNaN(genreId)) {
        setSelectedGenreId(genreId);
      }
    }
  }, [searchParams]);

  // Fetch movies - either from regular list or discover API (for genre filtering)
  const { data: listData, isLoading: listIsLoading } = useMovieList(listType, {
    query: searchQuery || undefined,
    page: currentPage,
  });

  const { data: discoverData, isLoading: discoverIsLoading } =
    useDiscoverMovies(selectedGenreId, { page: currentPage });

  // Use discover data if genre is selected, otherwise use regular list
  const currentData = selectedGenreId ? discoverData : listData;
  const isLoading = selectedGenreId ? discoverIsLoading : listIsLoading;

  if (currentData) {
    dispatch(getMovieList(currentData));
  }

  const handleSearch = (keyword: string) => {
    setSearchQuery(keyword);
    setListType(keyword ? "search" : "now_playing");
    setCurrentPage(1); // Reset to first page on new search
    setSelectedGenreId(null); // Clear genre filter when searching
  };

  const handleListTypeChange = (type: MovieListType) => {
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
    setCurrentPage(1); // Reset to first page on tab change
    setSelectedGenreId(null); // Clear genre filter when changing list type
  };

  const handleGenreClick = (genreId: number, genreName: string) => {
    // Filter current list by selected genre
    setSelectedGenreId(genreId);
    setCurrentPage(1);
  };

  const handleViewChange = useCallback((type: "grid" | "list") => {
    setViewType(type);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleMovieClick = useCallback(
    async (id: string) => {
      try {
        // Navigate immediately for better UX
        navigate(`/${id}`);

        // Fetch and cache data in background
        const [detailData, imageData] = await Promise.all([
          queryClient.fetchQuery({
            queryKey: movieKeys.detail(id),
            queryFn: async () => {
              const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/3/movie/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                  },
                }
              );
              return response.json();
            },
          }),
          queryClient.fetchQuery({
            queryKey: movieKeys.image(id),
            queryFn: async () => {
              const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/3/movie/${id}/images`,
                {
                  headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                  },
                }
              );
              return response.json();
            },
          }),
        ]);

        // Dispatch to store for immediate display
        dispatch(getMovieDetail(detailData));
        dispatch(getMovieImage(imageData));
      } catch (error) {
        console.error("Error fetching movie data:", error);
        // Navigation already happened, so data will load from store or API on detail page
      }
    },
    [dispatch, navigate, queryClient]
  );

  const listResults = movieList?.results || [];

  const __renderBody = () => {
    if (!movieList || isLoading) {
      return <MovieListSkeleton />;
    }
    if (!movieList?.results?.length) {
      return <EmptyState />;
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
      <>
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
      </>
    );
  };

  return (
    <>
      <Navbar
        onSearchChange={handleSearch}
        tabList={searchQuery ? undefined : TAB_LIST}
        onTabClick={handleListTypeChange}
      />
      <Container id="home">{__renderBody()}</Container>
    </>
  );
});
