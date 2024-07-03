import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Manga from "./pages/manga/Manga";
import Trending from "./pages/trending/Trending";
import Signin from "./pages/signin/Signin";
import Search from "./pages/search/Search";
import Profile from "./pages/profile/Profile";
import Fav from "./pages/profile/Fav";
import Suggestion from "./pages/profile/Suggestion";
import Cookies from "js-cookie";
import "./pages/home/Home.css";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./utils/ProtectedRoute";

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
      console.log("prendre le token depuis les cookies");
      const response = await fetch("http://localhost:3001/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jwt: token }),
      });

      const data = await response.json();
      console.log(data);

      //si auth est true cela signifie que le token existe, est verifié, extrait, comparé avec celui de la bdd

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

  useContext((auth) => {});

  useEffect(() => {
    fetchToken();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/trending",
          element: <Trending />,
        },
        {
          path: "manga/Manga/:id",
          element: <Manga />,
        },
        {
          path: "search/Search",
          element: <Search />,
        },
        {
          path: "profile/Profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile/Fav",
          element: (
            <ProtectedRoute>
              <Fav />,
            </ProtectedRoute>
          ),
        },
        {
          path: "profile/Suggestion/",

          element: (
            <ProtectedRoute>
              <Suggestion />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
