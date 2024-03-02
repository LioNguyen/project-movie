import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MovieState {
  movieList: MovieList | null;
  movieDetail: MovieDetail | null;
}

const initialState: MovieState = {
  movieList: null,
  movieDetail: null,
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
  },
});

export const { getMovieDetail, getMovieList } = movieSlice.actions;
export default movieSlice.reducer;
