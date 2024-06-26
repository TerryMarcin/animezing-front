import React, { useState } from "react";
import HamSvg from "../../components/assets/ham";
import GlassSvg from "../../components/assets/glass";

const Header = (props) => {
  const [animeList, setAnimeList] = useState([]);
  async function getSearchAnime(query) {
    const url = `https://api.jikan.moe/v4/anime?q=${query}&&limit=10`;

    const response = await fetch(url);

    const result = await response.json();

    setAnimeList(result.data);
    console.log(result.data);
  }

  const [isActive , setIsActive] = useState(false);
    console.log(isActive)
  const toggleClass = () => {
    (isActive)? setIsActive(false) : setIsActive(true)
  };

  return (
    <header style={{}}>
      <navbar className="navbar">
        <div className="navbar-container">
          <a className="navbar-logo" href="/">
            {" "}
            <img src="/images/oshi-no-ko.jpg" alt="logo" />
          </a>

          <div className="navbar-menu">
            {/* <img src="" alt="svg" /> */}
            {/* <HamSvg /> */}
            <div className="phone-signin" id="visible" onClick={toggleClass} >
              <a>
                <h5 >Menu</h5>
              </a>
      </div>

            </div>
      <div className={(isActive) ? 'target-active' : 'target'}>
        <a href="/">Home</a><a href="#">goodies</a><a href="#">recommandations</a>
          </div>
          <div className="navbar-links">
            <a href="/">
              <p>Home</p>
            </a>
            <a href="/trending/Trending">
              <p>Trending</p>
            </a>
            <a href="#">
              <p>Recommandations</p>
            </a>
          </div>
        </div>
        <div className="navbar-input_button">
          <div
            style={{
              position: "relative",
              zIndex: 999,
            }}
          >
            <a className="search" href="/search/Search">
              <h2 id="none">Search </h2>
              <GlassSvg />
            </a>
          </div>

          <div class="sb-container" id="none">
            <a href="/signin/Signin">Sign in / Sign up</a>
            <i class="fas fa-arrow-right"></i>
            <div className="bg"></div>
          </div>
          <div className="phone-signin" id="visible">
            {" "}
            <a href="/signin/Signin">
              <h5>Sign in</h5>
            </a>
          </div>
        </div>
      </navbar>
    </header>
  );
};

export default Header;
