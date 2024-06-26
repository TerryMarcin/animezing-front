import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Layout from "../../components/layout";

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

  useEffect(() => {
    getTopAnime();
  }, []);

  async function getTopAnime() {
    const url = "https://api.jikan.moe/v4/top/anime?limit=15";

    const response = await fetch(url);

    const result = await response.json();

    setAnimeList(result.data);
    console.log(result.data);
  }

  return (
    <Layout>
      <section>
        <img src="images/jojos-bizarre-adventure.jpg" alt="jojo" />
        <div className="hero-text_button" id="none">
          <div className="hero-text">
            <h1>WELCOME</h1>
          </div>
        </div>
      </section>
      <div className="trending">
        <div className="trending-title">
          <h2>Trending anime</h2>
        </div>
        {animeList && (
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
        )}
        <a href="/trending/Trending">
          <button className="button" id="none">
            View all
          </button>{" "}
          <div className="phone-signin" id="visible">
            {" "}
            <a href="/trending/Trending">
              <h5>view all</h5>
            </a>
          </div>
        </a>
      </div>
      <div className="trending">
        <div className="trending-title">
          <h2>Merch</h2>
        </div>
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
        <button className="button" id="none">
          View all
        </button>
        <div className="phone-signin" id="visible">
          {" "}
          <a href="/signin/Signin">
            <h5>view all</h5>
          </a>
        </div>
      </div>
    </Layout>
  );
};
export default Home;
