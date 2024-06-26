import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Manga from "./pages/manga/Manga";
import Trending from "./pages/trending/Trending";
import Signin from "./pages/signin/Signin";
import Search from "./pages/search/Search";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./pages/home/Home.css";

function App() {
  const [animeList, setAnimeList] = useState([]);

  async function getSearchAnime(query) {
    const url = `https://api.jikan.moe/v4/anime?q=${query}&&limit=10`;

    const response = await fetch(url);

    const result = await response.json();

    setAnimeList(result.data);
    console.log(result.data);
  }

  async function fetchToken() {
    try {
      let token = Cookies.get("token");
      if (!token) {
        throw "no token";
      }
      console.log(token);
      const response = await fetch("http://localhost:3001/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jwt: token }),
      });

      const data = await response.json();
      console.log(data);

      //si auth est true cela signifie que le token existe, est verifié, extrait,comparé avec celui de la bdd

      const auth = data.success;

      if (auth) {
        console.log("utilisateur authentifié");
      } else {
        console.log("erreur auth");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending/Trending" element={<Trending />} />
        <Route path="/signin/Signin" element={<Signin />} />
        <Route path="/manga/Manga/:id" element={<Manga />} />
        <Route path="/search/Search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
