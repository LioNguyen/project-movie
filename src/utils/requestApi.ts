import axios from "axios";

export const createAxios = () => {
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  return axiosInstance;
};

export const API_END_POINT = {
  NOW_PLAYING: "/3/movie/now_playing",
  TOP_RATED: "/3/movie/top_rated",
  SEARCH: "/3/search/movie",
  DETAIL: "/3/movie/{movie_id}",
  POSTER: "/3/movie/{movie_id}/images",
};
