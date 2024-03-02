import "./movie-card.styles.scss";

import { HTMLAttributes, useEffect, useState } from "react";

import movieBackground from "@/assets/movie-background.jpg";
import { Image } from "@/components";
import { getImageUrl, isImgUrlValid } from "@/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  imagePath: string;
  vote: number;
  title: string;
}

export const MovieCard = ({
  id,
  imagePath,
  title,
  vote,
  ...props
}: CardProps) => {
  const [moviePosterUrl, setMoviePosterUrl] = useState("");

  const getImage = async () => {
    const imgUrl = getImageUrl(imagePath);
    const isValid = await isImgUrlValid(getImageUrl(imagePath));

    setMoviePosterUrl(isValid ? imgUrl : movieBackground);
  };

  useEffect(() => {
    getImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagePath]);

  return (
    <div className="movie-card" {...props}>
      <div className="movie-card__thumbnail">
        <Image src={moviePosterUrl} alt={title} loading="lazy" />
      </div>
      <div className="movie-card__vote">{vote}</div>
      <div className="movie-card__title">{title}</div>
    </div>
  );
};
