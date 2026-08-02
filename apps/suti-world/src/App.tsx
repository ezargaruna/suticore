import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Home from "./pages/Home";
import Document from "./pages/Document";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AppLayout />}>

          <Route path="/" element={<Home />} />

          <Route
            path="/docs/:slug"
            element={<Document />}
          />

        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
