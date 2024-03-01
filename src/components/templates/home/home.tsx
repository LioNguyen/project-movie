import { memo } from "react";

import { Container, MovieList, Navbar, Tab, TabProps } from "@/components";
import { useAppSelector } from "@/hooks";

interface HomeProps extends Omit<TabProps, "tabList"> {
  // movieList: any[];
}

export const Home = memo(({ activeTab, onTabClick }: HomeProps) => {
  const movieList = useAppSelector((state) => state.movieList?.results) || [];

  console.log("🚀 @log ~ file: home.tsx:12 ~ Home ~ movieList:", movieList);

  const TabList = [
    {
      key: "Now Playing",
      name: "Now Playing",
      value: "NOW_PLAYING",
    },
    {
      key: "Top Rated",
      name: "Top Rated",
      value: "TOP_RATED",
    },
  ];
  const listTitle = TabList.filter((item) => item.value === activeTab)[0].name;

  return (
    <Container>
      <Navbar />

      <Tab activeTab={activeTab} tabList={TabList} onTabClick={onTabClick} />
      <MovieList listTitle={listTitle} listData={movieList} />
    </Container>
  );
});
