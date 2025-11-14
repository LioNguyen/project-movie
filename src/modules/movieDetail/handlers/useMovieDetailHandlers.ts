/**
 * Movie Detail Handlers
 *
 * This file encapsulates all business logic and data processing for the Detail component.
 * Following the module-based architecture pattern for better separation of concerns.
 */

import { useEffect, useMemo, useState } from "react";
import type { MovieVideo } from "@/core/domains/types";
import { useAppSelector } from "@/core/hooks";
import { checkAllImgUrl, fixedNumber, getImageUrl } from "@/core/utils";

interface MoviePoster {
  src: string;
  file_path: string;
  [key: string]: unknown;
}

/**
 * Custom hook to process and manage movie backdrop images
 */
export const useMovieBackdrops = () => {
  const [moviePosters, setMoviePosters] = useState<MoviePoster[]>([]);
  const movieImage = useAppSelector((state) => state.movie.movieImage);
  const movieBackdrops = movieImage?.backdrops || [];

  const getMovieBackdrops = async () => {
    try {
      if (movieBackdrops.length) {
        // Limit to latest 20 images
        const limitedBackdrops = movieBackdrops.slice(0, 20);
        const urlList = limitedBackdrops.map((item) =>
          getImageUrl(item.file_path)
        );

        const results = await checkAllImgUrl(urlList);
        const validList = limitedBackdrops
          .filter((_, index) => results[index])
          .map((item) => {
            return {
              ...item,
              src: getImageUrl(item.file_path),
            };
          });

        setMoviePosters(validList);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getMovieBackdrops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieImage]);

  return { moviePosters };
};

/**
 * Custom hook to extract movie data from Redux store
 */
export const useMovieData = () => {
  const movieData = useAppSelector((state) => state.movie.movieDetail);

  const movieDetails = useMemo(
    () => ({
      movieId: movieData?.id || "",
      movieTitle: movieData?.title || "",
      movieReleaseDate: movieData?.release_date || "",
      movieVoteAverage: movieData?.vote_average || 0,
      moviePopularity: movieData?.popularity || 0,
      movieGenres: movieData?.genres || [],
      movieOverview: movieData?.overview || "",
    }),
    [movieData]
  );

  return { movieData, ...movieDetails };
};

/**
 * Custom hook to find the best trailer from video list
 */
export const useMovieTrailer = (videos?: MovieVideo | null) => {
  const trailer = useMemo(() => {
    if (!videos?.results) return null;

    // Get official YouTube trailer
    const officialTrailer = videos.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official === true
    );

    // Fallback to any YouTube trailer if no official one found
    return (
      officialTrailer ||
      videos.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      )
    );
  }, [videos]);

  return { trailer };
};

/**
 * Custom hook to generate statistics data for the movie
 * Returns processed values without JSX icons (icons should be created in component)
 */
export const useMovieStatistics = (
  movieVoteAverage: number,
  moviePopularity: number
) => {
  const statisticsData = useMemo(
    () => ({
      rating: fixedNumber(movieVoteAverage, 2),
      popularity: fixedNumber(moviePopularity, 0),
    }),
    [movieVoteAverage, moviePopularity]
  );

  return { statisticsData };
};
