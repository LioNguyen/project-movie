import "./home.styles.scss";

import { memo } from "react";

import {
  Container,
  MovieList,
  Navbar,
  SearchProps,
  Tab,
  TabProps,
} from "@/components";
import { TAB_LIST } from "@/constants";
import { useAppSelector } from "@/hooks";

interface HomeProps extends SearchProps, Omit<TabProps, "tabList"> {}

export const Home = memo(({ onTabClick, onSearchChange }: HomeProps) => {
  const movieList = useAppSelector((state) => state.movie.movieList);
  const listData = movieList?.results || [];

  console.log("🚀 @log ~ file: home.tsx:12 ~ Home ~ movieList:", movieList);

  const __renderBody = () => {
    if (!movieList || !movieList?.results?.length) {
      return <>{/* Empty state here */}</>;
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
    <Container>
      <Navbar onSearchChange={onSearchChange} />
      {__renderBody()}
    </Container>
  );
});
