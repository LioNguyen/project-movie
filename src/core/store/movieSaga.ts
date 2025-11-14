/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/core/services/axios";
import type {
  MovieList,
  MovieDetail,
  MovieImage,
  MovieVideo,
} from "@/core/domains/types";
import {
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
} from "./movieSlice";

// API Endpoints
const MOVIE_ENDPOINTS = {
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

interface Genre {
  id: number;
  name: string;
}

interface GenresResponse {
  genres: Genre[];
}

/**
 * Saga to fetch movie list (now playing, top rated, upcoming, or search)
 */
function* fetchMovieListSaga(
  action: PayloadAction<{
    type: "now_playing" | "top_rated" | "upcoming" | "search";
    params?: { page?: number; query?: string };
  }>
): any {
  try {
    const { type, params } = action.payload;
    const endpoint =
      type === "now_playing"
        ? MOVIE_ENDPOINTS.NOW_PLAYING
        : type === "top_rated"
        ? MOVIE_ENDPOINTS.TOP_RATED
        : type === "upcoming"
        ? MOVIE_ENDPOINTS.UPCOMING
        : MOVIE_ENDPOINTS.SEARCH;

    // Skip search if no query is provided
    if (type === "search" && !params?.query) {
      return;
    }

    const response: { data: MovieList } = yield call(
      [axiosInstance, axiosInstance.get],
      endpoint,
      { params }
    );

    const movieList: MovieList = {
      ...response.data,
      type: type.toUpperCase() as MovieList["type"],
    };

    yield put(fetchMovieListSuccess(movieList));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch movie list";
    yield put(fetchMovieListFailure(errorMessage));
  }
}

/**
 * Saga to fetch movies by genre using Discover API
 */
function* fetchDiscoverMoviesSaga(
  action: PayloadAction<{
    genreId: number;
    params?: { page?: number; sort_by?: string };
  }>
): any {
  try {
    const { genreId, params } = action.payload;

    const response: { data: MovieList } = yield call(
      [axiosInstance, axiosInstance.get],
      MOVIE_ENDPOINTS.DISCOVER,
      {
        params: {
          with_genres: genreId,
          sort_by: params?.sort_by || "popularity.desc",
          page: params?.page || 1,
        },
      }
    );

    const movieList: MovieList = {
      ...response.data,
      type: "GENRE_FILTER",
    };

    yield put(fetchDiscoverMoviesSuccess(movieList));
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to fetch discover movies";
    yield put(fetchDiscoverMoviesFailure(errorMessage));
  }
}

/**
 * Saga to fetch movie details by ID
 */
function* fetchMovieDetailSaga(action: PayloadAction<string>): any {
  try {
    const movieId = action.payload;

    const response: { data: MovieDetail } = yield call(
      [axiosInstance, axiosInstance.get],
      MOVIE_ENDPOINTS.DETAIL(movieId)
    );

    yield put(fetchMovieDetailSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch movie detail";
    yield put(fetchMovieDetailFailure(errorMessage));
  }
}

/**
 * Saga to fetch movie images by ID
 */
function* fetchMovieImagesSaga(action: PayloadAction<string>): any {
  try {
    const movieId = action.payload;

    const response: { data: MovieImage } = yield call(
      [axiosInstance, axiosInstance.get],
      MOVIE_ENDPOINTS.IMAGES(movieId)
    );

    yield put(fetchMovieImagesSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch movie images";
    yield put(fetchMovieImagesFailure(errorMessage));
  }
}

/**
 * Saga to fetch movie videos/trailers by ID
 */
function* fetchMovieVideosSaga(action: PayloadAction<string>): any {
  try {
    const movieId = action.payload;

    const response: { data: MovieVideo } = yield call(
      [axiosInstance, axiosInstance.get],
      MOVIE_ENDPOINTS.VIDEOS(movieId)
    );

    yield put(fetchMovieVideosSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch movie videos";
    yield put(fetchMovieVideosFailure(errorMessage));
  }
}

/**
 * Saga to fetch all movie genres
 */
function* fetchGenresSaga(): any {
  try {
    const response: { data: GenresResponse } = yield call(
      [axiosInstance, axiosInstance.get],
      MOVIE_ENDPOINTS.GENRES
    );

    yield put(fetchGenresSuccess(response.data.genres));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch genres";
    yield put(fetchGenresFailure(errorMessage));
  }
}

/**
 * Root movie saga - watches for all movie-related actions
 */
export default function* movieSaga() {
  yield takeLatest(fetchMovieListRequest.type, fetchMovieListSaga);
  yield takeLatest(fetchDiscoverMoviesRequest.type, fetchDiscoverMoviesSaga);
  yield takeLatest(fetchMovieDetailRequest.type, fetchMovieDetailSaga);
  yield takeLatest(fetchMovieImagesRequest.type, fetchMovieImagesSaga);
  yield takeLatest(fetchMovieVideosRequest.type, fetchMovieVideosSaga);
  yield takeLatest(fetchGenresRequest.type, fetchGenresSaga);
}
