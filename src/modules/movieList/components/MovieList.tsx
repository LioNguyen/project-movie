import "./MovieList.styles.scss";

import { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import {
  Container,
  EmptyState,
  ListView,
  Navbar,
  Skeleton,
} from "@/core/components";
import { TAB_LIST } from "@/constants";
import { movieKeys, useMovieList } from "@/core/hooks/useMovieService";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import {
  getMovieDetail,
  getMovieImage,
  getMovieList,
} from "@/core/store/movieSlice";
import type { MovieListType } from "@/core/domains/types";

export const MovieList = memo(() => {
  const dispatch = useAppDispatch();
  const movieList = useAppSelector((state) => state.movie.movieList);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [listType, setListType] = useState<
    "now_playing" | "top_rated" | "upcoming" | "search"
  >("now_playing");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useMovieList(listType, {
    query: searchQuery || undefined,
    page: currentPage,
  });

  if (data) {
    dispatch(getMovieList(data));
  }

  const handleSearch = (keyword: string) => {
    setSearchQuery(keyword);
    setListType(keyword ? "search" : "now_playing");
    setCurrentPage(1); // Reset to first page on new search
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

        dispatch(getMovieDetail(detailData));
        dispatch(getMovieImage(imageData));

        setTimeout(() => {
          navigate(`/${id}`);
        }, 300);
      } catch (error) {
        console.error("Error prefetching movie data:", error);
        navigate(`/${id}`);
      }
    },
    [dispatch, navigate, queryClient]
  );

  const listData = movieList?.results || [];

  const __renderBody = () => {
    if (!movieList) {
      return (
        <div className="skeleton-loading">
          {Array(10)
            .fill(1)
            .map((_, index) => (
              <Skeleton key={index} />
            ))}
        </div>
      );
    }
    if (!movieList?.results?.length) {
      return <EmptyState />;
    }

    const currentListTitle =
      movieList?.type === "SEARCH"
        ? "Search Results"
        : movieList?.type === "NOW_PLAYING"
        ? "Now Playing"
        : movieList?.type === "TOP_RATED"
        ? "Top Rated"
        : "Upcoming";

    return (
      <>
        <ListView
          title={currentListTitle}
          data={listData}
          viewType={viewType}
          onViewChange={handleViewChange}
          onItemClick={handleMovieClick}
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
