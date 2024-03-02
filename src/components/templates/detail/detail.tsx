import "./detail.styles.scss";

import { memo, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuArrowUpRightFromCircle } from "react-icons/lu";

import {
  Container,
  Genre,
  Image,
  Navbar,
  NavbarProps,
  StatisticsBoard,
  StatisticsBoxProps,
} from "@/components";
import { useAppSelector } from "@/hooks";
import { checkAllImgUrl, fixedNumber, getImageUrl, getYear } from "@/utils";

interface DetailProps extends NavbarProps {}

export const Detail = ({ onBack }: DetailProps) => {
  const [moviePosters, setMoviePosters] = useState<any>([]);

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

  const statisticsList: StatisticsBoxProps[] = [
    {
      title: "Rating",
      icon: <FaStar color="#f5c518" />,
      statistic: fixedNumber(movieVoteAverage, 2),
    },
    {
      title: "Popularity",
      icon: <LuArrowUpRightFromCircle color="green" />,
      statistic: fixedNumber(moviePopularity, 0),
    },
  ];

  const getMovieBackdrops = async () => {
    try {
      if (movieBackdrops.length) {
        const urlList = movieBackdrops.map((item) =>
          getImageUrl(item.file_path)
        );

        const results = await checkAllImgUrl(urlList);
        const validList = movieBackdrops
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

  const __renderBody = () => {
    if (!movieData) {
      return <>{/* Empty state */}</>;
    }
    return (
      <>
        <div className="header-section">
          <div className="header__title">
            <p className="primary">{movieTitle}</p>
            {movieReleaseDate && (
              <p className="text">{getYear(movieReleaseDate)}</p>
            )}
          </div>
          <StatisticsBoard statisticsList={statisticsList} />
        </div>

        <div className="content-section">
          <div className="content__image">
            {moviePosters.map((item: any) => (
              <Image
                key={item.src}
                src={item.src}
                alt={item.src}
                loading="lazy"
                width="100%"
              />
            ))}
          </div>
          <div className="content__detail">
            <div className="genre-list">
              {movieGenres.map((item) => (
                <Genre key={item.id} text={item.name} />
              ))}
            </div>
            <StatisticsBoard statisticsList={statisticsList} />
            <p className="overview">{movieOverview}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar onBack={onBack} />
      <Container id="detail">{__renderBody()}</Container>
    </>
  );
};
