import { createSlice } from "@reduxjs/toolkit";

interface MovieState {
  movieList: {
    page: number;
    results: any[];
    total_pages: number;
    type: MovieListType;
  } | null;
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
