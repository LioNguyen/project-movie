import "./movie-list.styles.scss";

import { useState } from "react";
import { FaList, FaThList } from "react-icons/fa";
import { IoGrid, IoGridOutline } from "react-icons/io5";

import { MovieCard } from "@/components";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

interface Props {
  listTitle: string;
  listData: any[];
}

type ViewType = "grid" | "list";

export const MovieList = ({ listTitle, listData }: Props) => {
  const [viewType, setViewType] = useState<ViewType>("grid");
  const navigate = useNavigate();

  const view = [
    {
      key: "grid",
      title: "Grid",
      icon: <IoGridOutline color="white" />,
      iconActive: <IoGrid color="white" />,
    },
    {
      key: "list",
      title: "List",
      icon: <FaList color="white" />,
      iconActive: <FaThList color="white" />,
    },
  ];

  const handleViewChange = (type: ViewType) => {
    setViewType(type);
  };

  const handleMovieClick = (id: string) => {
    navigate(`/${id}`);
  };

  if (!listData.length) {
    return <></>;
  }

  return (
    <div className={clsx("movie-list")}>
      <div className="movie-list__header">
        <h3 className="title">{listTitle}</h3>
        <div className="view-type-box">
          {view.map((item) => (
            <div
              className={clsx("item", item.key === viewType && "active")}
              key={item.key}
              onClick={() => handleViewChange(item.key as ViewType)}
            >
              {item.key === viewType ? item.iconActive : item.icon}
            </div>
          ))}
        </div>
      </div>
      <div className={clsx("movie-list__content", viewType)}>
        {listData.map((item) => (
          <MovieCard
            key={item.id}
            imageUrl={item.poster_path}
            title={item.title}
            vote={item.vote_average}
            onClick={() => handleMovieClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
