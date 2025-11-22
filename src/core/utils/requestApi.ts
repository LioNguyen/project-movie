import axios from "axios";

import store from "@/core/store";
import { showToast } from "@/core/store/globalSlice";

export const API_END_POINT = {
  NOW_PLAYING: "/3/movie/now_playing",
  TOP_RATED: "/3/movie/top_rated",
  SEARCH: "/3/search/movie",
  DETAIL: "/3/movie/{movie_id}",
  POSTER: "/3/movie/{movie_id}/images",
};

export const createAxios = () => {
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log({ error });

      if (error.code === "ERR_NETWORK") {
        store.dispatch(
          showToast({
            type: "error",
            title: "Network Error!",
          })
        );
      } else {
        store.dispatch(
          showToast({ type: "error", title: "Something went wrong!" })
        );
      }
    }
  );

  return axiosInstance;
};
