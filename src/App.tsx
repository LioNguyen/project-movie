import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DetailPage, HomePage } from "@/pages";
import { Loader, Toast } from "@/core/components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:movieId" element={<DetailPage />} />
      </Routes>
      <Toast />
      <Loader />
    </BrowserRouter>
  );
}

export default App;
