import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Detail } from "@/components";
import { useAppDispatch } from "@/hooks";
import { getDetail, getImage } from "@/utils";

export const DetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const movieId = params?.movieId || "";

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    Promise.all([getImage(movieId), getDetail(movieId)]);
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
