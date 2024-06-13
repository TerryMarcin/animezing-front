import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Manga from "./pages/manga/Manga";
import Trending from "./pages/trending/Trending";
import Signin from "./pages/signin/Signin";
import React, { useState } from "react";

function App() {
  const [animeList, setAnimeList] = useState([]);

  async function getSearchAnime(query) {
    const url = `https://api.jikan.moe/v4/anime?q=${query}&&limit=10`;

    const response = await fetch(url);

    const result = await response.json();

    setAnimeList(result.data);
    console.log(result.data);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending/Trending" element={<Trending />} />
        <Route path="/signin/Signin" element={<Signin />} />
        <Route path="/manga/Manga/:id" element={<Manga />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
