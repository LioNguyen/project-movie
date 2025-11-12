import "./MovieCard.styles.scss";

import { HTMLAttributes, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

import movieBackground from "@/core/assets/movie-background.jpg";
import { Image, Text } from "@/core/components";
import { useAppSelector } from "@/core/hooks";
import { fixedNumber, getImageUrl, isImgUrlValid } from "@/core/utils";

interface Genre {
  id: number;
  name: string;
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  imagePath: string;
  vote: number;
  title: string;
  overview: string;
  genres?: Genre[];
  genreIds?: number[];
  onGenreClick?: (genreId: number, genreName: string) => void;
}

export const MovieCard = ({
  id,
  imagePath,
  title,
  vote,
  overview,
  genres = [],
  genreIds = [],
  onGenreClick,
  ...props
}: CardProps) => {
  const [moviePosterUrl, setMoviePosterUrl] = useState("");
  const storedGenres = useAppSelector((state) => state.movie.genres);

  const getImage = async () => {
    const imgUrl = getImageUrl(imagePath);
    const isValid = await isImgUrlValid(getImageUrl(imagePath));

    setMoviePosterUrl(isValid ? imgUrl : movieBackground);
  };

  useEffect(() => {
    getImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePath]);

  // Map genre IDs to names if we have stored genres
  const displayGenres =
    genres.length > 0
      ? genres.slice(0, 3)
      : storedGenres && genreIds.length > 0
      ? (genreIds
          .slice(0, 3)
          .map((id) => storedGenres.find((g) => g.id === id))
          .filter((g) => g !== undefined) as Genre[])
      : [];

  return (
    <div className="movie-card" {...props}>
      <div className="movie-card__thumbnail">
        <Image src={moviePosterUrl} alt={title} />
      </div>
      <div className="movie-card__body">
        <div className="overview">
          <Text content={overview} maxLength={100} />
        </div>
        <div>
          <div className="title">{title}</div>
          <div className="vote">
            <FaStar color="#f5c518" />
            <span>{fixedNumber(vote, 2)}</span>
          </div>
        </div>
        {displayGenres.length > 0 && (
          <div className="genre-tags">
            {displayGenres.map((genre) => (
              <span
                key={genre.id}
                className="genre-tag"
                onClick={(e) => {
                  e.stopPropagation();
                  onGenreClick?.(genre.id, genre.name);
                }}
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
