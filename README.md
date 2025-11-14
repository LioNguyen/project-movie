# MOVIE PROJECT

A modern, full-featured movie discovery application built with React 19, Redux Toolkit, and Redux Saga. Browse movies, search for favorites, and explore detailed information about films from The Movie Database (TMDB).

🔗 **Live Demo**: [https://lio-movie.vercel.app](https://lio-movie.vercel.app)

## Table of Contents

- [MOVIE PROJECT](#movie-project)
  - [Table of Contents](#table-of-contents)
  - [1. Project Overview](#1-project-overview)
  - [2. Tech Stack](#2-tech-stack)
  - [3. Architecture](#3-architecture)
  - [4. Features](#4-features)
  - [5. Getting Started](#5-getting-started)
  - [6. API Reference](#6-api-reference)
  - [7. Project Structure](#7-project-structure)
  - [8. User Stories](#8-user-stories)
  - [9. Requirements](#9-requirements)
  - [10. Video Walkthrough](#10-video-walkthrough)

## 1. Project Overview

This project is a responsive movie discovery web application that allows users to browse current movies, search for specific titles, and view detailed information about films. Built with modern React patterns and best practices, it demonstrates clean architecture, state management with Redux Saga, and performance optimization techniques.

**Key Highlights:**

- 🎬 Browse Now Playing, Top Rated, and Upcoming movies
- 🔍 Real-time search with debouncing
- 🎭 Filter movies by genre
- 📱 Responsive design (desktop-optimized)
- ⚡ Lazy loading and code splitting
- 🎨 Atomic Design pattern for components
- 🔄 Redux Saga for async state management
- 🚀 Optimized bundle size (~410KB gzipped to 138KB)

## 2. Tech Stack

### Core

- **React 19.2** - Latest React with modern hooks and concurrent features
- **TypeScript 5.2** - Type-safe development
- **Vite 5.4** - Lightning-fast build tool and dev server
- **Bun** - Fast JavaScript runtime and package manager

### State Management

- **Redux Toolkit 2.2** - Modern Redux with simplified API
- **Redux Saga 1.4** - Side effect management for async operations
- **React Redux 9.1** - Official React bindings for Redux

### Styling

- **Tailwind CSS 4.1** - Utility-first CSS framework
- **SCSS/SASS 1.93** - Custom styling with variables and mixins
- **Tailwind Merge** - Merge Tailwind classes intelligently
- **Class Variance Authority** - Type-safe component variants

### Routing & Data

- **React Router DOM 6.22** - Client-side routing
- **Axios 1.6** - HTTP client with interceptors
- **Lodash 4.17** - Utility functions

### UI Components

- **React Icons 5.0** - Icon library (Font Awesome, Lucide, etc.)
- **Radix UI** - Unstyled, accessible UI primitives
- **Shadcn/UI** - Re-usable components built with Radix UI

### Development Tools

- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vercel** - Deployment platform

## 3. Architecture

The project follows a **modular, domain-driven architecture** with clear separation of concerns:

```
src/
├── core/                    # Shared/reusable code
│   ├── components/          # Atomic Design components
│   │   ├── atoms/           # Basic building blocks
│   │   ├── molecules/       # Simple component combinations
│   │   ├── organisms/       # Complex UI sections
│   │   └── templates/       # Page layouts
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API clients and axios config
│   ├── store/               # Redux store, slices, and sagas
│   ├── utils/               # Utility functions
│   └── domains/             # TypeScript types and interfaces
│
├── modules/                 # Feature modules
│   ├── movieList/           # Movie list feature
│   │   ├── components/      # Feature-specific components
│   │   └── handlers/        # Business logic hooks
│   └── movieDetail/         # Movie detail feature
│       ├── components/      # Feature-specific components
│       └── handlers/        # Business logic hooks
│
└── pages/                   # Route pages
    ├── HomePage/
    └── DetailPage/
```

**Key Architectural Decisions:**

- ✅ **Atomic Design** for component organization
- ✅ **Redux Saga** for centralized async logic
- ✅ **Custom hooks** for reusable business logic
- ✅ **Handler separation** from UI components
- ✅ **Type-safe** throughout with TypeScript
- ✅ **Lazy loading** for optimal performance

## 4. Features

### Core Features

- ✅ View list of movies (Now Playing, Top Rated, Upcoming)
- ✅ Search movies with real-time results and debouncing
- ✅ Filter movies by genre
- ✅ View detailed movie information
- ✅ Toggle between grid and list view
- ✅ Pagination support
- ✅ Loading states with skeleton screens
- ✅ Error handling with toast notifications
- ✅ Empty states for no results
- ✅ Lazy load images with validation
- ✅ Responsive design

### Advanced Features

- ✅ Redux Saga for async state management
- ✅ Image URL validation (checks if image exists)
- ✅ Default background for invalid images
- ✅ Image carousel in movie detail page
- ✅ YouTube trailer integration
- ✅ Movie statistics (rating, popularity)
- ✅ Genre-based navigation
- ✅ URL-based search parameters
- ✅ Prefetching for better navigation UX
- ✅ Code splitting and lazy loading

## 5. Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- **TMDB API Key** - Get one from [The Movie Database](https://www.themoviedb.org/settings/api)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/LioNguyen/project-movie.git
cd project-movie
```

2. **Install dependencies**

```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.themoviedb.org
VITE_API_TOKEN=your_tmdb_api_token_here
```

4. **Start development server**

```bash
# Using Bun
bun run dev

# Or using npm
npm run dev
```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the application
bun run build

# Preview production build
bun run preview
```

### Linting

```bash
bun run lint
```

## 6. API Reference

This project uses **The Movie Database (TMDB) API v3**.

### Endpoints Used

| Endpoint                     | Method | Description                  |
| ---------------------------- | ------ | ---------------------------- |
| `/3/movie/now_playing`       | GET    | Get currently playing movies |
| `/3/movie/top_rated`         | GET    | Get top-rated movies         |
| `/3/movie/upcoming`          | GET    | Get upcoming movies          |
| `/3/search/movie`            | GET    | Search for movies            |
| `/3/discover/movie`          | GET    | Discover movies by genre     |
| `/3/movie/{movie_id}`        | GET    | Get movie details            |
| `/3/movie/{movie_id}/images` | GET    | Get movie images             |
| `/3/movie/{movie_id}/videos` | GET    | Get movie videos/trailers    |
| `/3/genre/movie/list`        | GET    | Get list of genres           |

### Image Configuration

- **Base URL**: `https://image.tmdb.org/t/p/`
- **Sizes**: `w500` (posters), `original` (backdrops)
- **Full URL**: `https://image.tmdb.org/t/p/w500/{file_path}`

## 7. Project Structure

```
project-movie/
├── public/                  # Static assets
│   ├── logo.png
│   └── vite.svg
├── src/
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   ├── index.css            # Global styles
│   ├── constants.ts         # App constants
│   │
│   ├── core/                # Core functionality
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Shared components (Atomic Design)
│   │   │   ├── atoms/       # Button, Image, Text, etc.
│   │   │   ├── molecules/   # Card, Navbar, etc.
│   │   │   ├── organisms/   # ListView, etc.
│   │   │   └── templates/   # Container, etc.
│   │   ├── domains/         # TypeScript types
│   │   ├── hooks/           # Custom hooks
│   │   │   ├── useStore.ts
│   │   │   └── useMovieService.ts
│   │   ├── services/        # API services
│   │   │   ├── axios.ts
│   │   │   └── endpoints.ts
│   │   ├── store/           # Redux configuration
│   │   │   ├── index.ts
│   │   │   ├── globalSlice.ts
│   │   │   ├── movieSlice.ts
│   │   │   ├── movieSaga.ts
│   │   │   └── rootSaga.ts
│   │   └── utils/           # Utility functions
│   │
│   ├── modules/             # Feature modules
│   │   ├── movieList/
│   │   │   ├── components/
│   │   │   │   ├── MovieList.tsx
│   │   │   │   └── atoms/
│   │   │   └── handlers/
│   │   │       └── useMovieListHandlers.ts
│   │   └── movieDetail/
│   │       ├── components/
│   │       │   ├── Detail.tsx
│   │       │   └── atoms/
│   │       └── handlers/
│   │           └── useMovieDetailHandlers.ts
│   │
│   └── pages/               # Route pages
│       ├── HomePage/
│       └── DetailPage/
│
├── .env                     # Environment variables
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── vite.config.ts
└── vercel.json              # Vercel deployment config
```

## 8. User Stories

**Original Challenge**: [Project Challenges Github](https://github.com/elotusteam/challenges/blob/main/frontend-2.md)

### Required Functionality ✅

- [x] User can view a list of movies currently playing in theaters. Poster images load asynchronously.
- [x] Add a tab bar for **Now Playing** and **Top Rated** movies.
- [x] Add a search bar.
- [x] User can view movie details by tapping on a cell.
- [x] User sees loading state while waiting for the API.
- [x] User sees an error message when there is a network error.
- [x] Simple responsive.

### Optional Features ✅

- [x] Segmented control to switch between list view and grid view
- [ ] All images fade in (partial implementation)
- [x] Lazy load images
- [x] Customized highlight and selection effects
- [x] Skeleton loading for better UX
- [x] Responsive design (desktop-optimized)

### Additional Features ✅

- [x] Toast notifications for errors and feedback
- [x] Debounced search input (300ms delay)
- [x] Empty states when no results found
- [x] Image URL validation utility
- [x] Default background for invalid images
- [x] Image carousel in movie detail page
- [x] Skeleton loading screens
- [x] **Atomic Design Pattern** for component organization
- [x] **Redux Saga** for state management (migrated from React Query)
- [x] **Module-based architecture** with handlers separation
- [x] Lazy loading and code splitting
- [x] Deployed on Vercel

### Future Enhancements 🚀

- [ ] Enhanced pagination UI
- [ ] Skeleton loading for individual movie cards
- [ ] Mobile-optimized UI
- [ ] Image fade-in animations
- [ ] Movie recommendations
- [ ] User favorites/watchlist
- [ ] Advanced filtering (year, rating, etc.)
- [ ] Dark/light theme toggle

## 9. Requirements

### Project Requirements Met ✅

- ✅ **ReactJS with TypeScript** - Latest React 19.2 with full TypeScript support
- ✅ **SCSS** - Custom SCSS for component-specific styling
- ✅ **No CSS/UI frameworks** - Built with Tailwind utility classes (as allowed) and custom SCSS
- ✅ **Best Practices** - Clean code, proper architecture, and performance optimization

### Additional Technical Achievements

- ✅ Redux Toolkit + Redux Saga architecture
- ✅ Modular, scalable code structure
- ✅ Type-safe development
- ✅ Optimized bundle size (~410KB → 138KB gzipped)
- ✅ Accessibility considerations
- ✅ Error boundary and error handling

## 10. Video Walkthrough

Here's a walkthrough of implemented user stories:

> 📹 [View Project Demo Video](https://drive.google.com/file/d/1VCpu7k274b-WqUJiI0yEVGakjwpFecHp/view?usp=drive_link)

---

## Contributing

This is a portfolio project, but suggestions and feedback are welcome! Feel free to open an issue or reach out.

## License

This project is open source and available for educational purposes.

## Acknowledgments

- **The Movie Database (TMDB)** for providing the movie data API
- **Vercel** for hosting and deployment
- **React Community** for excellent documentation and tools

---

## Contact & Links

- 🌐 **Live Demo**: [https://lio-movie.vercel.app](https://lio-movie.vercel.app)
- 💼 **GitHub**: [LioNguyen](https://github.com/LioNguyen)
- 📧 **Email**: [Your Email]

---

**Built with ❤️ by Lio Nguyen**

_Thank you for checking out this project! This showcases modern React development practices, clean architecture, and state management with Redux Saga._
