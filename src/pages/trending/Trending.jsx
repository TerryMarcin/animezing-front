import React, { useEffect, useState } from "react";

const Trending = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    getTopAnime();
  }, []);

  async function getTopAnime() {
    const url = "https://api.jikan.moe/v4/top/anime?limit=20";

    const response = await fetch(url);

    const result = await response.json();

    setAnimeList(result.data);
    console.log(result.data);
  }

  return (
    <>
      <div className="trending">
        <div className="trending-title">
          <h2>Trending anime</h2>
        </div>
        <ul className="trending-list">
          {animeList &&
            animeList.map((anime) => (
              <div class="trending-list-card" key={anime.mal_id}>
                <a href={`/manga/manga/${anime.mal_id}`}>
                  <img src={anime.images.jpg.image_url} alt="img" />
                </a>
                <p>{anime.title}</p>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
};
export default Trending;
