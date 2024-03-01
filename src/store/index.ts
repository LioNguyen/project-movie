import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slice";

const store = configureStore({
  reducer: movieReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
