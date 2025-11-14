import "./Detail.styles.scss";

import { memo, useMemo } from "react";
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
import { getYear } from "@/core/utils";
import {
  useMovieBackdrops,
  useMovieData,
  useMovieTrailer,
  useMovieStatistics,
} from "../handlers";

interface DetailProps {
  videos?: MovieVideo | null;
  onGenreClick?: (genreId: number, genreName: string) => void;
}

export const Detail = ({ videos, onGenreClick }: DetailProps) => {
  // Use custom hooks for data and logic
  const {
    movieData,
    movieTitle,
    movieReleaseDate,
    movieVoteAverage,
    moviePopularity,
    movieGenres,
    movieOverview,
  } = useMovieData();

  const { moviePosters } = useMovieBackdrops();
  const { trailer } = useMovieTrailer(videos);
  const { statisticsData } = useMovieStatistics(
    movieVoteAverage,
    moviePopularity
  );

  // Create statistics list with icons (JSX must be in component)
  const statisticsList: StatisticsBoxProps[] = useMemo(
    () => [
      {
        title: "Rating",
        icon: <FaStar color="#f5c518" />,
        statistic: statisticsData.rating,
      },
      {
        title: "Popularity",
        icon: <LuTrendingUp color="green" />,
        statistic: statisticsData.popularity,
      },
    ],
    [statisticsData]
  );

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
            moviePosters.map((item) => (
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
