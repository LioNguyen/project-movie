import { useEffect } from "react";

import { Home } from "@/components";
import { useAppDispatch } from "@/hooks";
import { getMovieList } from "@/store/movieSlice";
import { API_END_POINT, getData } from "@/utils";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const getList = async (type: MovieListType, params?: any) => {
    const apiEndPoint =
      type === "NOW_PLAYING"
        ? API_END_POINT.NOW_PLAYING
        : type === "TOP_RATED"
        ? API_END_POINT.TOP_RATED
        : API_END_POINT.SEARCH;
    try {
      await getData(apiEndPoint, params, (data) =>
        dispatch(
          getMovieList({
            ...data,
            type,
          })
        )
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSearch = async (keyword: string) => {
    getList(keyword ? "SEARCH" : "NOW_PLAYING", { query: keyword });
  };

  const handleListTypeChange = (type: MovieListType) => {
    getList(type);
  };

  useEffect(() => {
    getList("NOW_PLAYING");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Home onTabClick={handleListTypeChange} onSearchChange={handleSearch} />
    </>
  );
};
