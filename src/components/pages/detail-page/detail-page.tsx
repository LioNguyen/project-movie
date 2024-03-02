import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Detail } from "@/components";
import { API_END_POINT, getData } from "@/utils";
import { useAppDispatch } from "@/hooks";
import { hideLoader, showLoader } from "@/store/globalSlice";
import { getMovieDetail } from "@/store/movieSlice";

export const DetailPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const movieId = params?.movieId || "";

  const getList = async () => {
    try {
      dispatch(showLoader());
      await getData(
        API_END_POINT.DETAIL.replace("{movie_id}", movieId),
        null,
        (data) => {
          dispatch(
            getMovieDetail({
              ...data,
            })
          );
        }
      );
    } catch (error) {
      console.log({ error });
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    getList();
  }, [movieId]);

  if (!movieId) {
    return <>{/* No data */}</>;
  }

  return (
    <>
      <Detail onBack={handleBack} />
    </>
  );
};
