import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useOutletContext } from "react-router-dom";
import debounce from "lodash.debounce";

/* ---------------------------------------
-----------------carousel-----------------
-----------------------------------------*/

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

/* ---------------------------------------
-----------------Home---------------------
-----------------------------------------*/

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  let user = useOutletContext();

  useEffect(() => {
    console.log("USE EFFECT");
    getTopAnime();
    getTopManga();
  }, []);

  let getTopAnime = debounce(async function () {
    const url = "https://api.jikan.moe/v4/top/anime?limit=15";

    try {
      const response = await fetch(url);

      const result = await response.json();
      console.log("ANIMES", result.data);
      setAnimeList(result.data);
      setLoading(false);
    } catch (error) {
      console.log("error fetching animelist:", error);
      setLoading(false);
    }
  }, 1000);

  let getTopManga = debounce(async function () {
    const url = "https://api.jikan.moe/v4/top/manga?limit=15";

    try {
      const response = await fetch(url);

      const result = await response.json();

      console.log("MANGAS", result.data);
      setMangaList(result.data);
      setLoading(false);
    } catch (error) {
      console.log("error fetching mangalist:", error);
      setLoading(false);
    }
  }, 1000);

  return (
    <>
      <section>
        <img src="images/jojos-bizarre-adventure.jpg" alt="jojo" />
        <div className="hero-text_button" id="none">
          <div className="hero-text">
            <h1>Welcome {user.user ? user.user.name : null}</h1>
          </div>
        </div>
      </section>
      <div className="trending">
        <div className="trending-title">
          <h2>Trending anime</h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : animeList.length > 0 ? (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {animeList.map((anime) => (
              <div class="trending-list-carousel-card" key={anime.mal_id}>
                <a href={`/manga/manga/${anime.mal_id}`}>
                  <div>
                    <img src={anime.images.jpg.image_url} alt="img" />
                  </div>
                </a>
                <p>{anime.title}</p>
              </div>
            ))}
          </Carousel>
        ) : (
          <p>No anime found</p>
        )}
        <a href="/trending">
          <button className="button" id="none">
            View all
          </button>{" "}
          <div className="phone-signin" id="visible">
            {" "}
            <a href="/trending">
              <h5>view all</h5>
            </a>
          </div>
        </a>
      </div>
      <div className="trending">
        <div className="trending-title">
          <h2>Trending manga</h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : animeList.length > 0 ? (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {mangaList.map((manga) => (
              <div class="trending-list-carousel-card" key={manga.mal_id}>
                <a href={`/manga/manga/${manga.mal_id}`}>
                  <div>
                    <img src={manga.images.jpg.image_url} alt="img" />
                  </div>
                </a>
                <p>{manga.title}</p>
              </div>
            ))}
          </Carousel>
        ) : (
          <p>No manga found</p>
        )}
        <button className="button" id="none">
          Next update
        </button>
        <div className="phone-signin" id="visible">
          {" "}
          <a href="/#">
            <h5>Next update</h5>
          </a>
        </div>
      </div>
    </>
  );
};
export default Home;
