import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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

interface MovieState {
  movieList: MovieList | null;
  movieDetail: MovieDetail | null;
  movieImage: MovieImage | null;
  movieVideos: MovieVideo | null;
  genres: Genre[] | null;
  isLoading: boolean;
  error: string | null;
  // Track loading states for different operations
  loadingStates: {
    movieList: boolean;
    movieDetail: boolean;
    movieImage: boolean;
    movieVideos: boolean;
    genres: boolean;
  };
}

const initialState: MovieState = {
  movieList: null,
  movieDetail: null,
  movieImage: null,
  movieVideos: null,
  genres: null,
  isLoading: false,
  error: null,
  loadingStates: {
    movieList: false,
    movieDetail: false,
    movieImage: false,
    movieVideos: false,
    genres: false,
  },
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    // Fetch movie list actions
    fetchMovieListRequest: (
      state,
      action: PayloadAction<{
        type: "now_playing" | "top_rated" | "upcoming" | "search";
        params?: { page?: number; query?: string };
      }>
    ) => {
      state.loadingStates.movieList = true;
      state.error = null;
    },
    fetchMovieListSuccess: (state, action: PayloadAction<MovieList>) => {
      state.movieList = action.payload;
      state.loadingStates.movieList = false;
      state.error = null;
    },
    fetchMovieListFailure: (state, action: PayloadAction<string>) => {
      state.loadingStates.movieList = false;
      state.error = action.payload;
    },

    // Fetch discover movies (genre filter) actions
    fetchDiscoverMoviesRequest: (
      state,
      action: PayloadAction<{
        genreId: number;
        params?: { page?: number; sort_by?: string };
      }>
    ) => {
      state.loadingStates.movieList = true;
      state.error = null;
    },
    fetchDiscoverMoviesSuccess: (state, action: PayloadAction<MovieList>) => {
      state.movieList = action.payload;
      state.loadingStates.movieList = false;
      state.error = null;
    },
    fetchDiscoverMoviesFailure: (state, action: PayloadAction<string>) => {
      state.loadingStates.movieList = false;
      state.error = action.payload;
    },

    // Fetch movie detail actions
    fetchMovieDetailRequest: (state, action: PayloadAction<string>) => {
      state.loadingStates.movieDetail = true;
      state.error = null;
    },
    fetchMovieDetailSuccess: (state, action: PayloadAction<MovieDetail>) => {
      state.movieDetail = action.payload;
      state.loadingStates.movieDetail = false;
      state.error = null;
    },
    fetchMovieDetailFailure: (state, action: PayloadAction<string>) => {
      state.loadingStates.movieDetail = false;
      state.error = action.payload;
    },

    // Fetch movie images actions
    fetchMovieImagesRequest: (state, action: PayloadAction<string>) => {
      state.loadingStates.movieImage = true;
      state.error = null;
    },
    fetchMovieImagesSuccess: (state, action: PayloadAction<MovieImage>) => {
      state.movieImage = action.payload;
      state.loadingStates.movieImage = false;
      state.error = null;
    },
    fetchMovieImagesFailure: (state, action: PayloadAction<string>) => {
      state.loadingStates.movieImage = false;
      state.error = action.payload;
    },

    // Fetch movie videos actions
    fetchMovieVideosRequest: (state, action: PayloadAction<string>) => {
      state.loadingStates.movieVideos = true;
      state.error = null;
    },
    fetchMovieVideosSuccess: (state, action: PayloadAction<MovieVideo>) => {
      state.movieVideos = action.payload;
      state.loadingStates.movieVideos = false;
      state.error = null;
    },
    fetchMovieVideosFailure: (state, action: PayloadAction<string>) => {
      state.loadingStates.movieVideos = false;
      state.error = action.payload;
    },

    // Fetch genres actions
    fetchGenresRequest: (state) => {
      state.loadingStates.genres = true;
      state.error = null;
    },
    fetchGenresSuccess: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
      state.loadingStates.genres = false;
      state.error = null;
    },
    fetchGenresFailure: (state, action: PayloadAction<string>) => {
      state.loadingStates.genres = false;
      state.error = action.payload;
    },

    // Legacy actions for backward compatibility (if needed)
    getMovieList: (state, action: PayloadAction<MovieList>) => {
      state.movieList = action.payload;
    },
    getMovieDetail: (state, action: PayloadAction<MovieDetail>) => {
      state.movieDetail = action.payload;
    },
    getMovieImage: (state, action: PayloadAction<MovieImage>) => {
      state.movieImage = action.payload;
    },
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchMovieListRequest,
  fetchMovieListSuccess,
  fetchMovieListFailure,
  fetchDiscoverMoviesRequest,
  fetchDiscoverMoviesSuccess,
  fetchDiscoverMoviesFailure,
  fetchMovieDetailRequest,
  fetchMovieDetailSuccess,
  fetchMovieDetailFailure,
  fetchMovieImagesRequest,
  fetchMovieImagesSuccess,
  fetchMovieImagesFailure,
  fetchMovieVideosRequest,
  fetchMovieVideosSuccess,
  fetchMovieVideosFailure,
  fetchGenresRequest,
  fetchGenresSuccess,
  fetchGenresFailure,
  getMovieDetail,
  getMovieImage,
  getMovieList,
  setGenres,
  clearError,
} = movieSlice.actions;

export default movieSlice.reducer;
