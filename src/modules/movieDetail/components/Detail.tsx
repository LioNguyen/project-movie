import "./Detail.styles.scss";

import { memo, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuTrendingUp } from "react-icons/lu";

import {
  Container,
  Genre,
  Image,
  StatisticsBoard,
  StatisticsBoxProps,
} from "@/core/components";
import { MovieVideo } from "@/core/domains/types";
import { useAppSelector } from "@/core/hooks";
import {
  checkAllImgUrl,
  fixedNumber,
  getImageUrl,
  getYear,
} from "@/core/utils";

interface DetailProps {
  videos?: MovieVideo | null;
  onGenreClick?: (genreId: number, genreName: string) => void;
}

interface MoviePoster {
  src: string;
  file_path: string;
  [key: string]: unknown;
}

export const Detail = ({ videos, onGenreClick }: DetailProps) => {
  const [moviePosters, setMoviePosters] = useState<MoviePoster[]>([]);

  const movieData = useAppSelector((state) => state.movie.movieDetail);
  const movieImage = useAppSelector((state) => state.movie.movieImage);

  const movieId = movieData?.id || "";
  const movieTitle = movieData?.title || "";
  const movieReleaseDate = movieData?.release_date || "";
  const movieVoteAverage = movieData?.vote_average || 0;
  const moviePopularity = movieData?.popularity || 0;
  const movieBackdrops = movieImage?.backdrops || [];
  const movieGenres = movieData?.genres || [];
  const movieOverview = movieData?.overview || "";

  // Get official YouTube trailer
  const officialTrailer = videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official === true
  );
  // Fallback to any YouTube trailer if no official one found
  const trailer =
    officialTrailer ||
    videos?.results?.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );

  const statisticsList: StatisticsBoxProps[] = [
    {
      title: "Rating",
      icon: <FaStar color="#f5c518" />,
      statistic: fixedNumber(movieVoteAverage, 2),
    },
    {
      title: "Popularity",
      icon: <LuTrendingUp color="green" />,
      statistic: fixedNumber(moviePopularity, 0),
    },
  ];

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

  if (!movieData) {
    return (
      <Container id="detail">
        <div>{/* Empty state */}</div>
      </Container>
    );
  }

  return (
    <Container id="detail">
      <div className="header-section">
        <div className="header__title">
          <p className="primary">{movieTitle}</p>
          {movieReleaseDate && (
            <p className="text">{getYear(movieReleaseDate)}</p>
          )}
        </div>
        <StatisticsBoard statisticsList={statisticsList} />
      </div>

      {trailer && (
        <div className="trailer-section">
          <h2 className="trailer__title">Official Trailer</h2>
          <div className="trailer__container">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`}
              title={trailer.name || "Movie Trailer"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div className="content-section">
        <div className="content__image">
          {moviePosters.length > 0 ? (
            moviePosters.map((item: MoviePoster) => (
              <Image
                key={item.src}
                src={item.src}
                alt="Movie backdrop"
                width="100%"
                style={{ borderRadius: "8px" }}
              />
            ))
          ) : (
            <div
              style={{
                gridColumn: "1 / -1",
                height: "200px",
                background: "rgba(85, 85, 85, 0.3)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              No images available
            </div>
          )}
        </div>
        <div className="content__detail">
          {movieGenres.length > 0 && (
            <div className="genre-list">
              {movieGenres.map((item) => (
                <Genre
                  key={item.id}
                  text={item.name}
                  id={item.id}
                  onClick={(id) => {
                    if (id && onGenreClick) {
                      onGenreClick(id, item.name);
                    }
                  }}
                />
              ))}
            </div>
          )}
          <StatisticsBoard statisticsList={statisticsList} />
          {movieOverview && <p className="overview">{movieOverview}</p>}
        </div>
      </div>
    </Container>
  );
};
