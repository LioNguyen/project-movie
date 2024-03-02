import axios from "axios";

import store from "@/store";
import { hideLoader, showLoader, showToast } from "@/store/globalSlice";
import { getMovieDetail, getMovieImage } from "@/store/movieSlice";

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

export const getData = async (
  url: string,
  params?: any,
  successCallback?: (res: any) => void,
  failureCallback?: () => void
) => {
  const axios = createAxios();
  try {
    store.dispatch(showLoader());
    const res = await axios.get(url, { params });

    if (res) {
      if (successCallback) {
        successCallback(res.data);
      }

      return { data: res.data };
    }
  } catch (error) {
    console.log({ error });
    store.dispatch(
      showToast({ type: "error", title: "Something went wrong!" })
    );
    if (failureCallback) {
      failureCallback();
    }
  } finally {
    store.dispatch(hideLoader());
  }
};

export const getImage = (movieId: string) => {
  getData(API_END_POINT.POSTER.replace("{movie_id}", movieId), null, (res) => {
    store.dispatch(getMovieImage({ ...res }));
  });
};

export const getDetail = (movieId: string) => {
  getData(API_END_POINT.DETAIL.replace("{movie_id}", movieId), null, (res) => {
    store.dispatch(getMovieDetail({ ...res }));
  });
};
