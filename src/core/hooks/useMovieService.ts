/**
 * Movie Service - Redux Saga Integration
 *
 * This file provides Redux selectors and action creators for movie-related operations.
 * Previously used React Query, now migrated to Redux Saga for state management.
 */

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useStore";
import {
  fetchMovieListRequest,
  fetchDiscoverMoviesRequest,
  fetchMovieDetailRequest,
  fetchMovieImagesRequest,
  fetchMovieVideosRequest,
  fetchGenresRequest,
} from "@/core/store/movieSlice";
import type { RootState } from "@/core/store";

/**
 * Hook to fetch and access movie list from Redux store
 * Dispatches appropriate action based on list type and parameters
 */
export const useMovieList = (
  type: "now_playing" | "top_rated" | "upcoming" | "search",
  params?: { page?: number; query?: string }
) => {
  const dispatch = useAppDispatch();
  const movieList = useAppSelector((state) => state.movie.movieList);
  const isLoading = useAppSelector(
    (state) => state.movie.loadingStates.movieList
  );
  const error = useAppSelector((state) => state.movie.error);

  useEffect(() => {
    // Skip search if no query is provided
    if (type === "search" && !params?.query) {
      return;
    }

    dispatch(
      fetchMovieListRequest({
        type,
        params,
      })
    );
  }, [dispatch, type, params]);

  return {
    data: movieList,
    isLoading,
    error,
  };
};

/**
 * Hook to fetch movies by genre using Discover API
 */
export const useDiscoverMovies = (
  genreId: number | null,
  params?: { page?: number; sort_by?: string }
) => {
  const dispatch = useAppDispatch();
  const movieList = useAppSelector((state) => state.movie.movieList);
  const isLoading = useAppSelector(
    (state) => state.movie.loadingStates.movieList
  );
  const error = useAppSelector((state) => state.movie.error);

  useEffect(() => {
    if (!genreId) return;

    dispatch(
      fetchDiscoverMoviesRequest({
        genreId,
        params,
      })
    );
  }, [dispatch, genreId, params]);

  return {
    data: movieList,
    isLoading,
    error,
  };
};

/**
 * Hook to fetch movie details by ID
 */
export const useMovieDetail = (movieId: string | null) => {
  const dispatch = useAppDispatch();
  const movieDetail = useAppSelector((state) => state.movie.movieDetail);
  const isLoading = useAppSelector(
    (state) => state.movie.loadingStates.movieDetail
  );
  const error = useAppSelector((state) => state.movie.error);

  useEffect(() => {
    if (!movieId) return;

    dispatch(fetchMovieDetailRequest(movieId));
  }, [dispatch, movieId]);

  return {
    data: movieDetail,
    isLoading,
    error,
  };
};

/**
 * Hook to fetch movie images by ID
 */
export const useMovieImages = (movieId: string | null) => {
  const dispatch = useAppDispatch();
  const movieImage = useAppSelector((state) => state.movie.movieImage);
  const isLoading = useAppSelector(
    (state) => state.movie.loadingStates.movieImage
  );
  const error = useAppSelector((state) => state.movie.error);

  useEffect(() => {
    if (!movieId) return;

    dispatch(fetchMovieImagesRequest(movieId));
  }, [dispatch, movieId]);

  return {
    data: movieImage,
    isLoading,
    error,
  };
};

/**
 * Hook to fetch movie videos/trailers by ID
 */
export const useMovieVideos = (movieId: string | null) => {
  const dispatch = useAppDispatch();
  const movieVideos = useAppSelector((state) => state.movie.movieVideos);
  const isLoading = useAppSelector(
    (state) => state.movie.loadingStates.movieVideos
  );
  const error = useAppSelector((state) => state.movie.error);

  useEffect(() => {
    if (!movieId) return;

    dispatch(fetchMovieVideosRequest(movieId));
  }, [dispatch, movieId]);

  return {
    data: movieVideos,
    isLoading,
    error,
  };
};

/**
 * Hook to fetch all movie genres
 */
export const useGenres = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => state.movie.genres);
  const isLoading = useAppSelector((state) => state.movie.loadingStates.genres);
  const error = useAppSelector((state) => state.movie.error);

  useEffect(() => {
    if (!genres) {
      dispatch(fetchGenresRequest());
    }
  }, [dispatch, genres]);

  return {
    data: genres,
    isLoading,
    error,
  };
};

/**
 * Combined hook to fetch both detail and images
 */
export const useMovieDetailWithImages = (movieId: string | null) => {
  const detail = useMovieDetail(movieId);
  const images = useMovieImages(movieId);

  return {
    detail,
    images,
    isLoading: detail.isLoading || images.isLoading,
    error: detail.error || images.error,
  };
};

/**
 * Combined hook to fetch detail, images, and videos
 */
export const useMovieDetailWithImagesAndVideos = (movieId: string | null) => {
  const detail = useMovieDetail(movieId);
  const images = useMovieImages(movieId);
  const videos = useMovieVideos(movieId);

  return {
    detail,
    images,
    videos,
    isLoading: detail.isLoading || images.isLoading || videos.isLoading,
    error: detail.error || images.error || videos.error,
  };
};

// Redux selectors for direct state access
export const selectMovieList = (state: RootState) => state.movie.movieList;
export const selectMovieDetail = (state: RootState) => state.movie.movieDetail;
export const selectMovieImage = (state: RootState) => state.movie.movieImage;
export const selectMovieVideos = (state: RootState) => state.movie.movieVideos;
export const selectGenres = (state: RootState) => state.movie.genres;
export const selectMovieLoadingStates = (state: RootState) =>
  state.movie.loadingStates;
export const selectMovieError = (state: RootState) => state.movie.error;

/**
 * Hook to manage genres fetching
 * Fetches genres once on mount if not already loaded
 */
export const useGenresFetch = () => {
  const dispatch = useAppDispatch();
  const storedGenres = useAppSelector((state) => state.movie.genres);

  useEffect(() => {
    if (!storedGenres) {
      dispatch(fetchGenresRequest());
    }
  }, [dispatch, storedGenres]);

  return { genres: storedGenres };
};

/**
 * Hook to fetch movie list with automatic dispatching
 * Manages fetching based on listType, search query, or genre filter
 */
export const useMovieListFetch = (config: {
  listType: "now_playing" | "top_rated" | "upcoming" | "search";
  searchQuery: string;
  currentPage: number;
  selectedGenreId: number | null;
}) => {
  const dispatch = useAppDispatch();
  const { listType, searchQuery, currentPage, selectedGenreId } = config;

  useEffect(() => {
    if (selectedGenreId) {
      // Fetch by genre using discover API
      dispatch(
        fetchDiscoverMoviesRequest({
          genreId: selectedGenreId,
          params: { page: currentPage },
        })
      );
    } else {
      // Fetch regular movie list (now playing, top rated, upcoming, or search)
      dispatch(
        fetchMovieListRequest({
          type: listType,
          params: {
            page: currentPage,
            query: searchQuery || undefined,
          },
        })
      );
    }
  }, [dispatch, listType, searchQuery, currentPage, selectedGenreId]);
};

/**
 * Hook to prefetch movie details for navigation optimization
 * Returns a callback to prefetch movie detail and images
 */
export const useMoviePrefetch = () => {
  const dispatch = useAppDispatch();

  const prefetchMovie = useCallback(
    (movieId: string) => {
      dispatch(fetchMovieDetailRequest(movieId));
      dispatch(fetchMovieImagesRequest(movieId));
    },
    [dispatch]
  );

  return { prefetchMovie };
};

export default {
  useMovieList,
  useDiscoverMovies,
  useMovieDetail,
  useMovieImages,
  useMovieVideos,
  useGenres,
  useMovieDetailWithImages,
  useMovieDetailWithImagesAndVideos,
  useGenresFetch,
  useMovieListFetch,
  useMoviePrefetch,
};
