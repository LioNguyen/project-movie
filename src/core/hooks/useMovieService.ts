import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/core/services/axios";
import type {
  MovieList,
  MovieDetail,
  MovieImage,
  MovieVideo,
} from "@/core/domains/types";

interface Genre {
  id: number;
  name: string;
}

interface GenresResponse {
  genres: Genre[];
}

// API Endpoints
export const MOVIE_ENDPOINTS = {
  NOW_PLAYING: "/3/movie/now_playing",
  TOP_RATED: "/3/movie/top_rated",
  UPCOMING: "/3/movie/upcoming",
  SEARCH: "/3/search/movie",
  DISCOVER: "/3/discover/movie",
  GENRES: "/3/genre/movie/list",
  DETAIL: (id: string) => `/3/movie/${id}`,
  IMAGES: (id: string) => `/3/movie/${id}/images`,
  VIDEOS: (id: string) => `/3/movie/${id}/videos`,
};

// Query keys for caching
export const movieKeys = {
  all: ["movies"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (type: string, params?: Record<string, unknown>) =>
    [...movieKeys.lists(), type, params] as const,
  discover: (params?: Record<string, unknown>) =>
    [...movieKeys.all, "discover", params] as const,
  details: () => [...movieKeys.all, "detail"] as const,
  detail: (id: string) => [...movieKeys.details(), id] as const,
  images: () => [...movieKeys.all, "images"] as const,
  image: (id: string) => [...movieKeys.images(), id] as const,
  videos: () => [...movieKeys.all, "videos"] as const,
  video: (id: string) => [...movieKeys.videos(), id] as const,
  genres: () => [...movieKeys.all, "genres"] as const,
};

/**
 * Hook to fetch all movie genres
 */
export const useGenres = () => {
  return useQuery({
    queryKey: movieKeys.genres(),
    queryFn: async (): Promise<Genre[]> => {
      const response = await axiosInstance.get<GenresResponse>(
        MOVIE_ENDPOINTS.GENRES
      );
      return response.data.genres;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours (genres rarely change)
  });
};

/**
 * Hook to fetch movies by genre using Discover API
 */
export const useDiscoverMovies = (
  genreId: number | null,
  params?: { page?: number; sort_by?: string }
) => {
  return useQuery({
    queryKey: movieKeys.discover({ genreId, ...params }),
    queryFn: async (): Promise<MovieList> => {
      if (!genreId) throw new Error("Genre ID is required");
      const response = await axiosInstance.get(MOVIE_ENDPOINTS.DISCOVER, {
        params: {
          with_genres: genreId,
          sort_by: params?.sort_by || "popularity.desc",
          page: params?.page || 1,
        },
      });
      return { ...response.data, type: "GENRE_FILTER" };
    },
    enabled: !!genreId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch movie list (now playing, top rated, upcoming, or search)
 */
export const useMovieList = (
  type: "now_playing" | "top_rated" | "upcoming" | "search",
  params?: { page?: number; query?: string }
) => {
  const endpoint =
    type === "now_playing"
      ? MOVIE_ENDPOINTS.NOW_PLAYING
      : type === "top_rated"
      ? MOVIE_ENDPOINTS.TOP_RATED
      : type === "upcoming"
      ? MOVIE_ENDPOINTS.UPCOMING
      : MOVIE_ENDPOINTS.SEARCH;

  return useQuery({
    queryKey: movieKeys.list(type, params),
    queryFn: async (): Promise<MovieList> => {
      const response = await axiosInstance.get(endpoint, { params });
      return { ...response.data, type: type.toUpperCase() };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: type === "search" ? !!params?.query : true, // Only search if query exists
  });
};

/**
 * Hook to fetch movie details by ID
 */
export const useMovieDetail = (movieId: string | null) => {
  return useQuery({
    queryKey: movieKeys.detail(movieId || ""),
    queryFn: async (): Promise<MovieDetail> => {
      if (!movieId) throw new Error("Movie ID is required");
      const response = await axiosInstance.get(MOVIE_ENDPOINTS.DETAIL(movieId));
      return response.data;
    },
    enabled: !!movieId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch movie images by ID
 */
export const useMovieImages = (movieId: string | null) => {
  return useQuery({
    queryKey: movieKeys.image(movieId || ""),
    queryFn: async (): Promise<MovieImage> => {
      if (!movieId) throw new Error("Movie ID is required");
      const response = await axiosInstance.get(MOVIE_ENDPOINTS.IMAGES(movieId));
      return response.data;
    },
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes (images rarely change)
  });
};

/**
 * Hook to fetch movie videos/trailers by ID
 */
export const useMovieVideos = (movieId: string | null) => {
  return useQuery({
    queryKey: movieKeys.video(movieId || ""),
    queryFn: async (): Promise<MovieVideo> => {
      if (!movieId) throw new Error("Movie ID is required");
      const response = await axiosInstance.get(MOVIE_ENDPOINTS.VIDEOS(movieId));
      return response.data;
    },
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes (videos rarely change)
  });
};

/**
 * Combined hook to fetch both detail and images
 */
export const useMovieDetailWithImages = (movieId: string | null) => {
  const detailQuery = useMovieDetail(movieId);
  const imagesQuery = useMovieImages(movieId);

  return {
    detail: detailQuery,
    images: imagesQuery,
    isLoading: detailQuery.isLoading || imagesQuery.isLoading,
    isError: detailQuery.isError || imagesQuery.isError,
    error: detailQuery.error || imagesQuery.error,
  };
};

/**
 * Combined hook to fetch detail, images, and videos
 */
export const useMovieDetailWithImagesAndVideos = (movieId: string | null) => {
  const detailQuery = useMovieDetail(movieId);
  const imagesQuery = useMovieImages(movieId);
  const videosQuery = useMovieVideos(movieId);

  return {
    detail: detailQuery,
    images: imagesQuery,
    videos: videosQuery,
    isLoading:
      detailQuery.isLoading || imagesQuery.isLoading || videosQuery.isLoading,
    isError: detailQuery.isError || imagesQuery.isError || videosQuery.isError,
    error: detailQuery.error || imagesQuery.error || videosQuery.error,
  };
};

export default {
  useMovieList,
  useMovieDetail,
  useMovieImages,
  useMovieVideos,
  useMovieDetailWithImages,
  useMovieDetailWithImagesAndVideos,
};
