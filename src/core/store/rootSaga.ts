import { all } from "redux-saga/effects";
import movieSaga from "./movieSaga";

/**
 * Root saga that combines all feature sagas
 * Add new sagas here as the application grows
 */
export default function* rootSaga() {
  yield all([movieSaga()]);
}
