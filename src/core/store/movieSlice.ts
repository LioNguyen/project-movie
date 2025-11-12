import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { MovieList, MovieDetail, MovieImage } from "@/core/domains/types";

interface Genre {
  id: number;
  name: string;
}

interface MovieState {
  movieList: MovieList | null;
  movieDetail: MovieDetail | null;
  movieImage: MovieImage | null;
  genres: Genre[] | null;
}

const initialState: MovieState = {
  movieList: null,
  movieDetail: null,
  movieImage: null,
  genres: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMovieList: (state, action: PayloadAction<MovieList>) => {
      return {
        ...state,
        movieList: action.payload,
      };
    },
    getMovieDetail: (state, action: PayloadAction<MovieDetail>) => {
      return {
        ...state,
        movieDetail: action.payload,
      };
    },
    getMovieImage: (state, action: PayloadAction<MovieImage>) => {
      return {
        ...state,
        movieImage: action.payload,
      };
    },
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      return {
        ...state,
        genres: action.payload,
      };
    },
  },
});

export const { getMovieDetail, getMovieImage, getMovieList, setGenres } =
  movieSlice.actions;
export default movieSlice.reducer;
