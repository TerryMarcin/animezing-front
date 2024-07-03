import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Fav = () => {
  const user = useOutletContext();
  const [recommendations, setRecommendations] = useState([]);
  const [genres, setGenres] = useState([]);
  const [hasFavorites, setHasFavorites] = useState(false);

  useEffect(() => {
    user.user
      ? getRecommendations()
      : console.log("no user cannot access suggestions");
  }, []);

  async function getRecommendations() {
    if (!user.user.liked) return;
    setHasFavorites(true);

    const likedAnime = JSON.parse(user.user.liked);
    const recommendationDetails = [];
    const genreSet = new Set();

    for (let anime of likedAnime) {
      const animeUrl = `https://api.jikan.moe/v4/anime/${anime}`;
      const animeResponse = await fetch(animeUrl);
      const animeResult = await animeResponse.json();

      animeResult.data.genres.forEach((genre) => genreSet.add(genre.name));

      const recUrl = `https://api.jikan.moe/v4/anime/${anime}/recommendations`;
      const recResponse = await fetch(recUrl);
      const recResult = await recResponse.json();

      recommendationDetails.push(...recResult.data);
    }

    setRecommendations(recommendationDetails);
    setGenres(Array.from(genreSet));
  }

  return (
    <>
      {!hasFavorites ? (
        <div className="trending">
          <div className="trending-title">
            <h2>Add favorites to your list</h2>
          </div>
        </div>
      ) : (
        <div className="trending">
          <div className="trending-title">
            <h2>Recommended Anime</h2>
            <p>
              Because you like the following genres :{" "}
              {user.user ? <p id="green">{genres.join(", ")}</p> : null}
            </p>
          </div>
          <ul className="trending-list">
            {recommendations.map((anime) => (
              <div className="trending-list-card" key={anime.mal_id}>
                <a href={`/manga/Manga/${anime.entry.mal_id}`}>
                  <img
                    src={anime.entry.images.jpg.image_url}
                    alt={anime.entry.title}
                  />
                </a>
                <p>{anime.entry.title}</p>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Fav;
