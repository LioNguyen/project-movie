interface MovieList {
  page: number;
  results: any[];
  total_pages: number;
  type: MovieListType;
}

interface MovieDetail {
  id: string;
  title: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  popularity: number;
  genres: any[];
  overview: string;
}

type MovieListType = "NOW_PLAYING" | "TOP_RATED" | "SEARCH";
