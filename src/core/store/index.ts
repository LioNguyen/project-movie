import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";
import movieReducer from "./movieSlice";

const rootReducers = combineReducers({
  global: globalReducer,
  movie: movieReducer,
});

const store = configureStore({
  reducer: rootReducers,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
