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
  poster_path: string;
  genres: any[];
  overview: string;
}

interface MovieImage {
  id: string;
  backdrops: any[];
  logos: any[];
  posters: any[];
}

type MovieListType = "NOW_PLAYING" | "TOP_RATED" | "SEARCH";
