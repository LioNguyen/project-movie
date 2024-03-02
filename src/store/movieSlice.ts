import { createSlice } from "@reduxjs/toolkit";

interface MovieState {
  movieList: any;
  movieData: any;
}

const initialState: MovieState = {
  movieList: null,
  movieData: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMovieList: (state, action) => {
      return {
        ...state,
        movieList: action.payload,
      };
    },
    getMovieDetail: (state, action) => {
      return {
        ...state,
        movieData: action.payload,
      };
    },
  },
});

export const { getMovieDetail, getMovieList } = movieSlice.actions;
export default movieSlice.reducer;
