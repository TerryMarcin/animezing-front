import React, { useEffect, useState } from "react";
// import EyeSvg from "../../components/assets/eyeSvg";
import "../home/Home.css";
import Layout from "../../components/layout";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  // const [selectedAnime, setSelectedAnime] = useState(null);

  useEffect(() => {
    getTopAnime();
  }, []);

  async function getTopAnime() {
    const url = "https://api.jikan.moe/v4/top/anime?limit=4";

    const response = await fetch(url);

    const result = await response.json();

    setAnimeList(result.data);
    console.log(result.data);
  }

  // async function getSearchAnime(query) {
  //   const url = `https://api.jikan.moe/v4/anime?q=${query}&&limit=10`;

  //   const response = await fetch(url);

  //   const result = await response.json();

  //   setAnimeList(result.data);
  //   console.log(result.data);
  // }

  return (
    <Layout>
      {/* --------------------------------------
      -----------------header-------------------
      --------------------------------------- */}

      {/* <header>
        <navbar className="navbar">
          <div className="navbar-logo_links">
            <div className="navbar-logo">
              <img src="" alt="logo" />
            </div>
            <div className="navbar-links">
              <a href="/">
                <p>Home</p>
              </a>
              <a href="#">
                <p>Merch</p>
              </a>
              <a href="#">
                <p>Recommandations</p>
              </a>
            </div>
          </div>
          <div className="navbar-input_button">
            <input
              className="navbar-input"
              // style={styles.input}
              type="text"
              placeholder="Search"
              onChange={(e) => getSearchAnime(e.target.value)}
            />
            <button className="button">Sign up</button>
          </div>
        </navbar>
      </header> */}

      {/* --------------------------------------
      -----------------main---------------------
      --------------------------------------- */}

      <div className="hero">
        <img src="images/jojos-bizarre-adventure.jpg" alt="jojo" />
        <div className="hero-text_button">
          <div className="hero-text">
            <h1>WELCOME</h1>
            <p>lorem ipsum</p>
          </div>
          <button className="button">Latest news</button>
        </div>
      </div>
      <div className="trending">
        <div className="trending-title">
          <h2>Trending anime</h2>
        </div>
        <ul className="trending-list">
          {animeList &&
            animeList.map((anime) => (
              <div class="trending-list-card" key={anime.mal_id}>
                <a href={`/manga/manga/${anime.mal_id}`}>
                  <div className="trending-list-card-image">
                    <img src={anime.images.jpg.image_url} alt="img" />
                  </div>
                </a>
                <p>{anime.title}</p>
              </div>
            ))}
        </ul>
        <a href="/trending/Trending">
          <button className="button">View all</button>
        </a>
      </div>

      <div className="trending">
        <div className="trending-title">
          <h2>Merch</h2>
        </div>
        <ul className="trending-list">
          {animeList &&
            animeList.map((anime) => (
              <div class="trending-list-card" key={anime.mal_id}>
                <a href={`/manga/manga/${anime.mal_id}`}>
                  <div className="trending-list-card-image">
                    <img src={anime.images.jpg.image_url} alt="img" />
                  </div>
                </a>
                <p>{anime.title}</p>
              </div>
            ))}
        </ul>
        <button className="button">View all</button>
      </div>

      {/* --------------------------------------
      -----------------footer-------------------
      --------------------------------------- */}
    </Layout>
  );
};

// const styles = {
//   navbar: {
//     // display: "flex",
//   },
//   input: {
//     backgroundColor: "#D9D9D9",
//     borderRadius: "10px",
//     padding: "8px",
//   },
// };

export default Home;
