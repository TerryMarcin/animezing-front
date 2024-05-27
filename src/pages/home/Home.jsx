import React, { useEffect, useState } from "react";
import EyeSvg from "../../components/assets/eyeSvg";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);

  useEffect(() => {
    getTopAnime();
  }, []);

  async function getTopAnime() {
    const url = "https://api.jikan.moe/v4/top/anime";

    const response = await fetch(url);

    const result = await response.json();

    setAnimeList(result.data);
    console.log(result.data);
  }

  async function getSearchAnime(query) {
    const url = `https://api.jikan.moe/v4/anime?q=${query}&&limit=10`;

    const response = await fetch(url);

    const result = await response.json();

    setAnimeList(result.data);
    console.log(result.data);
  }

  return (
    <div>
      <h2>RECHERCHE</h2>
      <input
        type="text"
        placeholder="rechercher un anime par titre"
        onChange={(e) => getSearchAnime(e.target.value)}
      />
      <ul>
        {animeList &&
          animeList.map((anime) => (
            <div key={anime.mal_id}>
              <a href={`/profil/manga/${anime.mal_id}`}>
                <img src={anime.images.jpg.image_url} alt="img" />
              </a>
              <h2>{anime.title}</h2>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Home;
