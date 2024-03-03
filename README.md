# MOVIE PROJECT

- [MOVIE PROJECT](#movie-project)
  - [1. NOTE](#1-note)
  - [2. API](#2-api)
  - [3. User Stories](#3-user-stories)
  - [4. Requirements](#4-requirements)
  - [5. Video Walkthrough](#5-video-walkthrough)
  - [Submit](#submit)

## 1. NOTE

- Image path: `https://image.tmdb.org/t/p/w500/{file_path}`

## 2. API

- NOW_PLAYING: `https://api.themoviedb.org/3/movie/now_playing`
- TOP_RATED: `https://api.themoviedb.org/3/movie/top_rated`
- SEARCH: `https://api.themoviedb.org/3/search/movie`
- DETAIL: `https://api.themoviedb.org/3/movie/{movie_id}`
- POSTER: `https://api.themoviedb.org/3/movie/{movie_id}/images`

## 3. User Stories

- [Project Challenges Github](https://github.com/elotusteam/challenges/blob/main/frontend-2.md)
- [Movie Website](https://lio-movie.vercel.app)

The following **required** functionality is completed:

- [x] User can view a list of movies currently playing in theaters. Poster images load asynchronously.
- [x] Add a tab bar for **Now Playing** and **Top Rated** movies.
- [x] Add a search bar.
- [x] User can view movie details by tapping on a cell.
- [x] User sees loading state while waiting for the API.
- [x] User sees an error message when there is a network error.
- [x] Simple responsive.

The following **optional** features are implemented:

- [x] Implement segmented control to switch between list view and grid view.
- [ ] All images fade in.
- [x] Implement lazy load image.
- [x] Customize the highlight and selection effect of the cell.
- [ ] Improve UX loading by skeleton loading.
- [ ] Enhance responsive.

The following **additional** features are implemented:

- [x] Add toast popup for any errors or notifications
- [x] Add debounce to search input
- [x] Add empty state when there is no results found
- [x] Add image slide in movie detail
- [x] Add skeleton loading, but still have place to enhance
- [x] Use Atomic Design Pattern to manage all components
- [x] All components are wrapped in lazy load
- [x] Deploy web on vercel [Movie Website](https://lio-movie.vercel.app)

Room to enhance

- [ ] Add pagination for movie list
- [ ] Skeleton loading for each movie card
- [ ] Mobile UI

## 4. Requirements

- Please use ReactJS with typescript
- Please use SCSS
- Please do not use any CSS/SCSS framework or UI library

## 5. Video Walkthrough

Here's a walkthrough of implemented user stories:

> Please record screen to a GIF file and attach link here

## Submit

**When you're done, send us back a link to a repository with your source code, with a description of what you've done and any build instructions in the readme!**
