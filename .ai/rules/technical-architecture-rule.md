# Technical Architecture Documentation

## 1. Tech Stack & Overview

**Vite + React 19 SPA** with Redux Toolkit + Redux Saga consuming TMDB API

- **Build/Runtime**: Vite 5.4.21, React 19.2.0, TypeScript 5.2.2
- **State/Routing**: Redux Toolkit 2.2.1 + Redux Saga, React Router DOM 6.22.2
- **Styling/UI**: Tailwind CSS 4.1.17 + SCSS modules, Lucide React icons, Radix UI

## 2. Project Structure

```
src/
├── core/
│   ├── components/          # Reusable atomic components (core layer)
│   │   ├── atoms/           # Button, Loader, Text, Search, Genre, etc.
│   │   ├── molecules/       # Navbar, Card, StatisticsBoard
│   │   ├── organisms/       # ListView (complex compositions)
│   │   └── templates/       # Container layouts
│   ├── domains/types/       # Shared TypeScript interfaces
│   ├── hooks/               # useStore, useMovieService, useApi
│   ├── services/            # axios instance, API endpoints
│   ├── store/               # Redux slices & sagas
│   └── utils/               # Shared utilities (cn, date, image, etc.)
├── modules/                 # Domain-driven features (feature isolation)
│   ├── movieList/
│   │   ├── components/      # Local atomic hierarchy
│   │   │   ├── MovieList.tsx
│   │   │   └── atoms/       # Local atoms (MovieListSkeleton, etc.)
│   │   └── handlers/        # Feature-specific handlers
│   └── movieDetail/
│       ├── components/      # Local atomic hierarchy
│       │   ├── Detail.tsx
│       │   └── atoms/       # Local atoms (DetailPageSkeleton, etc.)
│       └── handlers/        # Feature-specific handlers
├── pages/                   # React Router pages (HomePage, DetailPage)
├── App.tsx, main.tsx        # Entry points
└── constants.ts, index.css
```

## 3. Component Architecture & Import Rules

### Atomic Design Hierarchy (Core Layer)

Components follow strict atomic design with NO cross-layer imports:

- **Atoms** (simplest): `Button`, `Loader`, `Text`, `Search`, `Genre`, `Image`, etc.

  - ✅ Can import: utilities, types, React
  - ❌ Cannot import: other atoms, molecules, organisms

- **Molecules** (medium): `Navbar`, `Card`, `StatisticsBoard`

  - ✅ Can import: atoms, utilities, types, React
  - ❌ Cannot import: other molecules, organisms

- **Organisms** (complex): `ListView` (compositions of molecules + atoms)

  - ✅ Can import: molecules, atoms, utilities, types, React
  - ❌ Cannot import: other organisms

- **Templates**: Container layout wrappers
  - ✅ Can import: organisms, molecules, atoms, utilities, types, React

### Feature Modules (Module Layer)

Each feature (`movieList`, `movieDetail`) has its own atomic hierarchy:

```
modules/movieList/components/
├── MovieList.tsx (main component)
├── MovieList.styles.scss
├── atoms/
│   └── MovieListSkeleton.tsx (feature-specific)
└── index.ts

modules/movieDetail/components/
├── Detail.tsx (main component)
├── Detail.styles.scss
├── atoms/
│   └── DetailPageSkeleton.tsx (feature-specific)
└── index.ts
```

### Import Rules (Critical)

1. **Core components cannot import from modules**

   - ❌ `src/core/components/molecules/Card.tsx` cannot import from `src/modules/movieList`

2. **Module components can import from core**

   - ✅ `src/modules/movieList/components/MovieList.tsx` → import from `@/core/components`

3. **Modules cannot import from other modules' components**

   - ❌ `src/modules/movieList` cannot import from `src/modules/movieDetail/components`
   - ✅ `src/modules/movieList` can import from `src/modules/movieDetail/handlers` or shared core

4. **Local module atoms are feature-specific**

   - Use `./atoms` or `@/modules/movieList/components/atoms` for module-local atoms
   - Do NOT reuse module atoms in other modules

5. **Import order** (maintain across all files):
   - External packages (React, Redux, routing)
   - Core hooks & actions
   - Components (use `@/` paths)
   - Utilities, types
   - Styles (SCSS modules)

## 4. Redux State Management

**Redux Saga Pattern** (Redux Toolkit + Redux Saga for async operations):

```typescript
// movieSlice.ts - State + Actions
const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movieList: null,
    loadingStates: { movieList: false },
    error: null,
  },
  reducers: {
    fetchMovieListRequest: (state) => {
      state.loadingStates.movieList = true;
    },
    fetchMovieListSuccess: (state, action) => {
      state.movieList = action.payload;
      state.loadingStates.movieList = false;
    },
    fetchMovieListFailure: (state, action) => {
      state.error = action.payload;
      state.loadingStates.movieList = false;
    },
  },
});

// movieSaga.ts - Side Effects (Async Operations)
function* fetchMovieListSaga(action) {
  try {
    const response = yield call(axiosInstance.get, "/3/movie/now_playing", {
      params: { page: action.payload.page },
    });
    yield put(fetchMovieListSuccess(response.data));
  } catch (error) {
    yield put(fetchMovieListFailure(error.message));
  }
}

// Watchers bind actions to saga functions
export function* watchFetchMovieList() {
  yield takeLatest(fetchMovieListRequest.type, fetchMovieListSaga);
}
```

**Using Redux in Components**:

```typescript
// Typed hooks from core/hooks/useStore.ts
const dispatch = useAppDispatch();
const { movieList, loadingStates, error } = useAppSelector(
  (state) => state.movie
);

// Dispatch actions
useEffect(() => {
  dispatch(fetchMovieListRequest({ page: 1 }));
}, [dispatch]);
```

## 5. Data Flow & Hooks

**Standard data flow**:

```
Components → useAppDispatch/useAppSelector → Redux Slices → Redux Saga → axios → TMDB API
```

**Custom hooks** (`core/hooks/useMovieService.ts`):

- `useMovieListFetch()`: Fetches movie list via saga
- `useGenresFetch()`: Fetches genres
- `useMovieDetailFetch()`: Fetches movie details

**Pattern**: Use custom hooks in components to encapsulate Redux dispatch logic.

## 6. File Naming & Organization

**Component files**:

- Single file: `ComponentName.tsx` (simple atoms)
- Complex: `ComponentName/ComponentName.tsx` + `ComponentName.styles.scss` + `index.ts`
- Export via `index.ts` for clean imports

**Example structure**:

```
src/core/components/atoms/Button/
├── button.tsx              # Component logic
├── Button.styles.scss      # Styles
└── index.ts                # Export: export { Button } from "./button"

src/modules/movieList/components/
├── MovieList.tsx           # Main feature component
├── MovieList.styles.scss   # Styles
├── atoms/                  # Feature-specific atoms
│   └── MovieListSkeleton.tsx
└── index.ts                # Export: export { MovieList } from "./MovieList"
```

## 7. Development Best Practices

**Code Quality**:

- `bun run type-check`: Validate TypeScript compilation
- `bun run lint`: Enforce ESLint rules
- `bun run build`: Verify production build

**Performance**:

- Use `memo()` for expensive components
- Debounce search/filter actions
- Lazy load images with TMDB URLs

**Type Safety**:

- Strict TypeScript usage (no implicit `any`)
- Use shared types from `core/domains/types/`
- Maintain type contracts between layers
