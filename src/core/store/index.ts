import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import globalReducer from "./globalSlice";
import movieReducer from "./movieSlice";
import rootSaga from "./rootSaga";

const rootReducers = combineReducers({
  global: globalReducer,
  movie: movieReducer,
});

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk as we're using saga
      serializableCheck: {
        // Ignore these action types for serialization checks
        ignoredActions: [
          "movie/fetchMovieListRequest",
          "movie/fetchDiscoverMoviesRequest",
          "movie/fetchMovieDetailRequest",
          "movie/fetchMovieImagesRequest",
          "movie/fetchMovieVideosRequest",
        ],
      },
    }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
