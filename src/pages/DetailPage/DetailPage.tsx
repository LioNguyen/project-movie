import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Detail } from "@/core/components";
import { DetailPageSkeleton } from "@/modules/movieDetail/components/atoms";
import { useAppDispatch } from "@/core/hooks";
import { useMovieDetailWithImagesAndVideos } from "@/core/hooks/useMovieService";
import { getMovieDetail, getMovieImage } from "@/core/store/movieSlice";

export const DetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const movieId = params?.movieId || "";
  const dispatch = useAppDispatch();

  // Fetch movie detail, images, and videos
  const { detail, images, videos, isLoading, isError } =
    useMovieDetailWithImagesAndVideos(movieId);

  // Update Redux store when data changes (for backward compatibility)
  useEffect(() => {
    if (detail.data) {
      dispatch(getMovieDetail(detail.data));
    }
  }, [detail.data, dispatch]);

  useEffect(() => {
    if (images.data) {
      dispatch(getMovieImage(images.data));
    }
  }, [images.data, dispatch]);

  const handleBack = () => {
    navigate("/");
  };

  const handleGenreClick = (genreId: number, genreName: string) => {
    // Navigate back to home and filter by genre
    // We'll need to pass this info via state or query params
    navigate(`/?genre=${genreId}`);
  };

  if (!movieId) {
    return <>{/* No data */}</>;
  }

  // Show skeleton loading while data is being fetched
  if (isLoading || !detail.data || !images.data || !videos.data) {
    return <DetailPageSkeleton onBack={handleBack} />;
  }

  return (
    <>
      <Detail
        onBack={handleBack}
        videos={videos.data}
        onGenreClick={handleGenreClick}
      />
    </>
  );
};
