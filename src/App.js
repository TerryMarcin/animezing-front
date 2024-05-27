import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Manga from "./pages/profil/Manga";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil/Manga/:id" element={<Manga />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
