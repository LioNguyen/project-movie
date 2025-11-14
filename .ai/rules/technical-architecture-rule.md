# Technical Architecture Documentation

## 1. Vite + React Application Architecture

**Vite + React 19 SPA with Redux Toolkit + Redux Saga, consuming TMDB API**

### 1.1. Tech Stack

- **Build/Runtime**: Vite 5.4.21, React 19.2.0, TypeScript 5.2.2
- **State/Routing**: Redux Toolkit 2.2.1 + Redux Saga, React Router DOM 6.22.2
- **API/Styling**: Axios 1.6.7, Tailwind CSS 4.1.17 + SCSS modules
- **UI**: shadcn/ui (Radix), Lucide React icons

### 1.2. Architecture

- **Frontend-Only SPA**: Client-side rendering with React Router
- **Redux Pattern**: Centralized state via Redux Toolkit + Redux Saga for async
- **Domain-Driven**: Features organized as modules (movieList, movieDetail)
- **Atomic Design**: Components hierarchy (atoms → molecules → organisms)

## 2. System Architecture

**Movie Discovery App**: Frontend-only React app browsing/searching movies via TMDB API with Redux state management

### High-Level Flow

```
React Components → Redux (Actions/Slices) → Redux Saga (Async) → Axios → TMDB API
```

## 3. Project Structure

```
src/
├── core/
│   ├── components/       # Atomic Design: atoms, molecules, organisms, templates
│   ├── domains/types/    # TypeScript interfaces (components.ts, movie.ts, services.ts)
│   ├── hooks/            # useStore.ts (Redux typed hooks), useMovieService.ts
│   ├── services/         # axios.ts, endpoints.ts, queryClient.ts (legacy)
│   ├── store/            # Redux: globalSlice.ts, movieSlice.ts, sagas/
│   └── utils/            # cn.ts, date.ts, debounce.ts, image.ts, number.ts
├── modules/              # Domain-driven features
│   ├── movieList/        # List feature with components
│   └── movieDetail/      # Detail feature with components
├── pages/                # React Router pages: HomePage, DetailPage
├── App.tsx, main.tsx     # Entry points
└── constants.ts, index.css
```

**Key Pattern**: `movieSlice.ts` (Redux state) ← `movieSaga.ts` (async side effects) ← `axiosInstance` (API)

## 4. Redux Saga Implementation

**Redux Saga Pattern (Simplified):**

```typescript
// movieSlice.ts - Actions + State
const movieSlice = createSlice({
  name: "movie",
  initialState: { movieList: null, loading: false, error: null },
  reducers: {
    fetchMovieListRequest: (state) => {
      state.loading = true;
    },
    fetchMovieListSuccess: (state, action) => {
      state.movieList = action.payload;
      state.loading = false;
    },
    fetchMovieListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// movieSaga.ts - Async + Side Effects
function* fetchMovieListSaga(action) {
  try {
    const { type, page } = action.payload;
    const response = yield call(axiosInstance.get, `/3/movie/${type}`, {
      params: { page },
    });
    yield put(fetchMovieListSuccess(response.data));
  } catch (error) {
    yield put(fetchMovieListFailure(error.message));
  }
}

export function* watchFetchMovieList() {
  yield takeLatest(fetchMovieListRequest.type, fetchMovieListSaga);
}

// store/index.ts - Configure middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

// Component Usage
const { dispatch } = useAppDispatch();
const { movieList, loading } = useAppSelector((state) => state.movie);

useEffect(() => {
  dispatch(fetchMovieListRequest({ type: "now_playing", page: 1 }));
}, [dispatch]);
```

## 5. Code Standards

### Components (Atomic Design)

- **Atoms**: Button, EmptyState, Loader, Pagination, Search, Tab, Text, Toast
- **Molecules**: Card, NavBar, StatisticsBoard
- **Organisms**: ListView
- **Pattern**: `ComponentName/ComponentName.tsx` + `ComponentName.styles.scss` + `index.ts`

### Utilities

```typescript
// services/axios.ts
export const axiosInstance = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key },
});
axiosInstance.interceptors.request.use((config) => config);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// utils/image.ts
export const getImageUrl = (path: string) =>
  `${TMDB_IMAGE_BASE_URL}/w500${path}`;

// utils/cn.ts
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

### Import Order

1. React/External packages
2. Redux hooks/actions
3. Components & utilities (@/ imports)
4. Styles (SCSS modules)

### Page Component with Redux

```typescript
export function HomePage() {
  const dispatch = useAppDispatch();
  const { movieList, loading } = useAppSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchMovieListRequest({ type: "now_playing", page: 1 }));
  }, [dispatch]);

  return (
    <div>
      {loading ? <Loader /> : <MovieList movies={movieList?.results} />}
    </div>
  );
}
```

### Routing

```typescript
// App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/movie/:id" element={<DetailPage />} />
  </Routes>
</BrowserRouter>
```
