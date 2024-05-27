import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Manga = ({ mangaId }) => {
  const [mangaDetails, setMangaDetails] = useState(null);
  const { id } = useParams();

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
    <div>
      {mangaDetails ? (
        <div>
          <img src={mangaDetails.images.jpg.image_url} alt={mangaDetails} />
          <h2>{mangaDetails.title}</h2>
          <p>Synopsis: {mangaDetails.synopsis}</p>
          <p>genres:</p>
          {mangaDetails.genres.map((genre) => (
            <p key={genre.mal_id}>{genre.name}</p>
          ))}
          <p>Score: {mangaDetails.score}</p>
          <p>rank: {mangaDetails.rank}</p>
        </div>
      ) : (
        <p>Loading manga details...</p>
      )}
    </div>
  );
};

export default Manga;
