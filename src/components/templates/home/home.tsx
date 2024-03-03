import "./home.styles.scss";

import { memo } from "react";

import {
  Container,
  EmptyState,
  MovieList,
  Navbar,
  NavbarProps,
  Skeleton,
  Tab,
  TabProps,
} from "@/components";
import { TAB_LIST } from "@/constants";
import { useAppSelector } from "@/hooks";

interface HomeProps extends NavbarProps, Omit<TabProps, "tabList"> {}

export const Home = memo(({ onTabClick, onSearchChange }: HomeProps) => {
  const movieList = useAppSelector((state) => state.movie.movieList);

  const listData = movieList?.results || [];

  const __renderBody = () => {
    if (!movieList) {
      return (
        <div className="skeleton-loading">
          {Array(5)
            .fill(1)
            .map((item) => (
              <Skeleton />
            ))}
        </div>
      );
    }
    if (!movieList?.results?.length) {
      return <EmptyState />;
    }

    if (movieList?.type === "SEARCH") {
      return <MovieList listTitle="Search Results" listData={listData} />;
    }

    return (
      <>
        <Tab tabList={TAB_LIST} onTabClick={onTabClick} />
        <MovieList
          listTitle={
            movieList?.type === "NOW_PLAYING" ? "Now Playing" : "Top Rated"
          }
          listData={listData}
        />
      </>
    );
  };

  return (
    <>
      <Navbar onSearchChange={onSearchChange} />
      <Container id="home">{__renderBody()}</Container>
    </>
  );
});
