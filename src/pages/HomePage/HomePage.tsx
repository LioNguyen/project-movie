import { Navbar } from "@/core/components";
import { MovieList } from "@/modules/movieList/components";

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <MovieList />
    </>
  );
};
