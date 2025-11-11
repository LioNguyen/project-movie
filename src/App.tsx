import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DetailPage, HomePage } from "@/pages";
import { Loader, Toast } from "@/core/components";
import { QueryProvider } from "./core/services";

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:movieId" element={<DetailPage />} />
        </Routes>
        <Toast />
        <Loader />
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
