export interface MovieList {
  page: number;
  results: any[];
  total_pages: number;
  type: MovieListType;
}

export interface MovieDetail {
  id: string;
  title: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  popularity: number;
  poster_path: string;
  genres: any[];
  overview: string;
}

export interface MovieImage {
  id: string;
  backdrops: any[];
  logos: any[];
  posters: any[];
}

export interface MovieVideo {
  id: string;
  results: MovieVideoResult[];
}

export interface MovieVideoResult {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export type MovieListType =
  | "NOW_PLAYING"
  | "TOP_RATED"
  | "UPCOMING"
  | "SEARCH"
  | "GENRE_FILTER";
