import React, { useState } from "react";

const Search = () => {
  const [animeList, setAnimeList] = useState([]);
  async function getSearchAnime(query) {
    const url = `https://api.jikan.moe/v4/anime?q=${query}&&limit=14&sfw=true`;

    const response = await fetch(url);

    const result = await response.json();

    setAnimeList(result.data);
    console.log(result.data);
  }
  return (
    <>
    
      <div className="search-field">
        <input
          className="search-input"
          placeholder="Search..."
          onChange={(e) => getSearchAnime(e.target.value)}
        />
      </div>
      {animeList && animeList.length > 0 ? (
        <div className="trending">
          <div className="trending-title">
            <h2>Top Results</h2>
          </div>
          <ul className="trending-list">
            {animeList.map((anime) => (
              <div className="trending-list-card" key={anime.mal_id}>
                <a href={`/manga/manga/${anime.mal_id}`}>
                  <img src={anime.images.jpg.image_url} alt="img" />
                </a>
                <p>{anime.title}</p>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        null
      )}
    </>
  );
};

export default Search;
