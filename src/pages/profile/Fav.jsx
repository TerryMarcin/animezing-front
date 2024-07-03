import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

/* ---------------------------------------
----------------Favorites-----------------
-----------------------------------------*/

const Fav = () => {
  let user = useOutletContext();

  const [animeList, setAnimeList] = useState([]);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    user.user
      ? getLikedAnime()
      : console.log("no user cannot access liked anime");
  }, []);

  async function getLikedAnime() {
    // Assurez-vous que user.user.liked existe et est une chaîne JSON valide
    if (!user.user.liked) return;
    setFav(true);

    let likedAnime;
    try {
      likedAnime = JSON.parse(user.user.liked);
    } catch (error) {
      console.error("Invalid JSON in liked anime:", error);
      return;
    }

    const animeDetails = [];

    for (let anime of likedAnime) {
      try {
        const url = `https://api.jikan.moe/v4/anime/${anime}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch anime details");
        }
        const result = await response.json();
        animeDetails.push(result.data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      }
    }

    setAnimeList(animeDetails);
  }

  return (
    <>
      {!fav ? (
        <div className="trending">
          <div className="trending-title">
            <h2>Add favorites to your list</h2>
          </div>
        </div>
      ) : (
        <div className="trending">
          <div className="trending-title">
            <h2>Liked Animes</h2>
          </div>
          <ul className="trending-list">
            {animeList.length > 0 &&
              animeList.map(
                (anime) =>
                  anime && (
                    <div className="trending-list-card" key={anime.mal_id}>
                      <a href={`/manga/manga/${anime.mal_id}`}>
                        <img src={anime.images.jpg.image_url} alt="img" />
                      </a>
                      <p>{anime.title}</p>
                    </div>
                  )
              )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Fav;
