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

export const getData = async (
  url: string,
  successCallback?: (res: any) => void,
  failureCallback?: () => void
) => {
  const axios = createAxios();

  try {
    const res = await axios.get(url);

    if (res) {
      if (successCallback) {
        successCallback(res.data);
      }

      return { data: res.data };
    }
  } catch (error) {
    console.log({ error });

    if (failureCallback) {
      failureCallback();
    }
  }
};

export const API_END_POINT = {
  NOW_PLAYING: "/3/movie/now_playing",
  TOP_RATED: "/3/movie/top_rated",
  SEARCH: "/3/search/movie",
  DETAIL: "/3/movie/{movie_id}",
  POSTER: "/3/movie/{movie_id}/images",
};
