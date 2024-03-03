import "./movie-card.styles.scss";

import { HTMLAttributes, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

import movieBackground from "@/assets/movie-background.jpg";
import { Image, Text } from "@/components";
import { fixedNumber, getImageUrl, isImgUrlValid } from "@/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  imagePath: string;
  vote: number;
  title: string;
  overview: string;
}

export const MovieCard = ({
  id,
  imagePath,
  title,
  vote,
  overview,
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
        <Image src={moviePosterUrl} alt={title} />
      </div>
      <div className="movie-card__body">
        <div className="overview">
          <Text content={overview} maxLength={100} />
        </div>
        <div className="vote">
          <FaStar color="#f5c518" />
          <span>{fixedNumber(vote, 2)}</span>
        </div>
        <div className="title">{title}</div>
      </div>
    </div>
  );
};
