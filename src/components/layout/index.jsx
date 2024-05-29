import Header from "./header";
import Footer from "./footer";
import React, { useState } from "react";

const Layout = (props) => {
  const [animeList, setAnimeList] = useState([]);
  async function getSearchAnime(query) {
    const url = `https://api.jikan.moe/v4/anime?q=${query}&&limit=10`;

    const response = await fetch(url);

    const result = await response.json();

    setAnimeList(result.data);
    console.log(result.data);
  }

  return (
    <div>
      <Header getSearchAnime={getSearchAnime} />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
