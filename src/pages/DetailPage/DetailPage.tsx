import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Navbar } from "@/core/components";
import { useAppDispatch } from "@/core/hooks";
import { useMovieDetailWithImagesAndVideos } from "@/core/hooks/useMovieService";
import { getMovieDetail, getMovieImage } from "@/core/store/movieSlice";
import { Detail } from "@/modules/movieDetail/components";
import { DetailPageSkeleton } from "@/modules/movieDetail/components/atoms";

export const DetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const movieId = params?.movieId || "";
  const dispatch = useAppDispatch();

  // Fetch movie detail, images, and videos
  const { detail, images, videos, isLoading, error } =
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
    navigate(`/?genre=${genreId}`);
  };

  if (!movieId) {
    return <>{/* No data */}</>;
  }

  // Show skeleton loading while data is being fetched
  if (isLoading || !detail.data || !images.data || !videos.data) {
    return <DetailPageSkeleton />;
  }

  return (
    <>
      <Navbar isBack />
      <Detail videos={videos.data} onGenreClick={handleGenreClick} />
    </>
  );
};
