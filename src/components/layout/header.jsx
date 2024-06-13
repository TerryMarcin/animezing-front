import React, { useState } from "react";
import HamSvg from "../../components/assets/ham";

const Header = (props) => {
  const [animeList, setAnimeList] = useState([]);
  async function getSearchAnime(query) {
    const url = `https://api.jikan.moe/v4/anime?q=${query}&&limit=10`;

    const response = await fetch(url);

    const result = await response.json();

    setAnimeList(result.data);
    console.log(result.data);
  }
  return (
    <header style={{}}>
      <navbar className="navbar">
        <div className="navbar-logo_links">
          <div className="navbar-logo">
            <a href="/">
              {" "}
              <img src="/images/oshi-no-ko.jpg" alt="logo" />
            </a>
          </div>
          <div className="navbar-menu">
            {/* <img src="" alt="svg" /> */}
            <HamSvg />
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
          <div
            style={{
              position: "relative",
              //faire passer au dessus du main
              zIndex: 999,
            }}
          >
            <input
              className="navbar-input"
              type="text"
              placeholder="Search"
              onChange={(e) => getSearchAnime(e.target.value)}
            />
            <div
              style={{
                width: "100%",
                position: "absolute",
                top: "calc(100% + 5px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="search-results"
                style={{
                  display: "flex",
                  height: "30px",
                  backgroundColor: "grey",
                }}
              >
                one piece
              </div>
            </div>
          </div>

          <a href="/signin/Signin">
            <button className="button">Sign in</button>
          </a>
        </div>
      </navbar>
    </header>
  );
};

export default Header;
