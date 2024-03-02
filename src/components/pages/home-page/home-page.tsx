import { Home } from "@/components";
import { useApi, useAppDispatch, useAppSelector } from "@/hooks";
import { getMovieList } from "@/store/movieSlice";
import { API_END_POINT, createAxios, getData } from "@/utils";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [listType, setListType] = useState<"NOW_PLAYING" | "TOP_RATED">(
    "NOW_PLAYING"
  );
  const dispatch = useAppDispatch();

  const getList = async () => {
    const endPoint =
      listType === "NOW_PLAYING"
        ? API_END_POINT.NOW_PLAYING
        : API_END_POINT.TOP_RATED;
    try {
      await getData(endPoint, (data) => dispatch(getMovieList(data)));
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listType]);

  return (
    <>
      <Home activeTab={listType} onTabClick={setListType} />
    </>
  );
};
