import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout";

const Manga = ({ mangaId }) => {
  const [mangaDetails, setMangaDetails] = useState(null);
  const { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    // Appel à une fonction pour obtenir les détails du manga en fonction de son ID
    getMangaDetails();
  }, []); // Le useEffect se déclenchera à chaque fois que mangaId changera

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

  // Affichage des détails du manga
  return (
    <Layout>
      {mangaDetails ? (
        <div className="manga-container">
          <img src={mangaDetails.images.jpg.image_url} alt={mangaDetails} />
          <div className="manga-text">
            <h2>{mangaDetails.title}</h2>
            <p>Synopsis: {mangaDetails.synopsis}</p>
            <div className="manga-genres">
              <p>Genres:</p>
              {mangaDetails.genres.map((genre) => (
                <p key={genre.mal_id}>{genre.name}</p>
              ))}
            </div>
            <p>Score: {mangaDetails.score}</p>
          </div>
        </div>
      ) : (
        <p>Loading manga details...</p>
      )}
    </Layout>
  );
};

export default Manga;
