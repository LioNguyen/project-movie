import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MovieState {
  movieList: MovieList | null;
  movieDetail: MovieDetail | null;
  movieImage: MovieImage | null;
}

const initialState: MovieState = {
  movieList: null,
  movieDetail: null,
  movieImage: null,
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
  },
});

export const { getMovieDetail, getMovieImage, getMovieList } =
  movieSlice.actions;
export default movieSlice.reducer;
