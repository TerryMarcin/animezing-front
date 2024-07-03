import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const Manga = ({ mangaId }) => {
  const [mangaDetails, setMangaDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [unFavorite, setUnfavorite] = useState(false);
  const { id } = useParams();
  const user = useOutletContext();

  // Le useEffect se déclenchera à chaque fois que mangaId changera
  useEffect(() => {
    // Appel à une fonction pour obtenir les détails du manga en fonction de son ID
    getMangaDetails();
  }, []);

  // Fonction asynchrone pour obtenir les détails du manga
  async function getMangaDetails() {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch manga details");
      }
      const data = await response.json();
      setMangaDetails(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching manga details:", error);
    }
  }

  async function onclick() {
    try {
      let user_id = user.user.id;
      let anime_id = id;
      setIsFavorite(true);
      setTimeout(() => setIsFavorite(false), 3000);
      console.log("CLICK");
      console.log("id du manga : ", user_id);
      console.log("id de l'user : ", id);
      const response = await fetch(`http://localhost:3001/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          anime_id,
        }),
      });

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error("Error liking anime:", error);
    }
  }
  async function onclick2() {
    try {
      let user_id = user.user.id;
      let anime_id = id;
      setUnfavorite(true);
      setTimeout(() => setUnfavorite(false), 4000);
      console.log("CLICK");
      console.log("id du manga : ", user_id);
      console.log("id de l'user : ", id);
      const response = await fetch(`http://localhost:3001/unlike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          anime_id,
        }),
      });

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error("Error liking anime:", error);
    }
  }
  console.log("USERRR", user);
  // Affichage des détails du manga
  return (
    <>
      {isFavorite ? (
        <p className="manga-message">anime ajouté au favoris</p>
      ) : null}
      {unFavorite ? (
        <p className="manga-message">anime supprimé des favoris</p>
      ) : null}
      {mangaDetails ? (
        <div className="manga">
          <div className="manga-container">
            <img src={mangaDetails.images.jpg.image_url} alt={mangaDetails} />
            <div className="manga-text">
              <h2>{mangaDetails.title}</h2>
              <h5>Synopsis : </h5>
              <p> {mangaDetails.synopsis}</p>
              <div className="manga-genres">
                <h5>Genres :</h5>
                {mangaDetails.genres.map((genre) => (
                  <p key={genre.mal_id}>{genre.name}</p>
                ))}
              </div>
              <h5>Score : </h5>
              <p>{mangaDetails.score}</p>
            </div>
          </div>

          {user.user === null ? (
            <a href="/signin">
              <button className="button" onClick={onclick2}>
                Login to add
              </button>
            </a>
          ) : (
            <div className="manga-buttons">
              <button className="button" onClick={onclick}>
                Like
              </button>
              <button className="button" onClick={onclick2}>
                Unlike
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading manga details...</p>
      )}
    </>
  );
};

export default Manga;
