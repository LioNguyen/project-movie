import { HTMLAttributes } from "react";
import "./movie-card.styles.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  vote: number;
  title: string;
}

export const MovieCard = ({ imageUrl, title, vote, ...props }: CardProps) => {
  return (
    <div className="movie-card" {...props}>
      <div className="movie-card__thumbnail">
        <img
          src={`${import.meta.env.VITE_API_IMAGE_URL}${imageUrl}`}
          alt={title}
        />
      </div>
      <div className="movie-card__vote">{vote}</div>
      <div className="movie-card__title">{title}</div>
    </div>
  );
};
