import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DetailPage, HomePage, Loader, Toast } from "@/components";

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
