import React, { useState } from "react";
import GlassSvg from "../../components/assets/glass";

const Header = (props) => {
  const [isActive, setIsActive] = useState(false);
  console.log(isActive);
  const toggleClass = () => {
    isActive ? setIsActive(false) : setIsActive(true);
  };

  return (
    <header>
      <div className="navbar">
        <div className="navbar-container">
          <a className="navbar-logo" href="/">
            <img src="/images\logo4.png" alt="logo" />
          </a>

          <div className="navbar-menu">
            {/* <img src="" alt="svg" /> */}
            {/* <HamSvg /> */}
            <div className="phone-signin" id="visible" onClick={toggleClass}>
              <a>
                <h5>Menu</h5>
              </a>
            </div>
          </div>
          <div className={isActive ? "target-active" : "target"}>
            <a href="/trending">Trending</a>
            <a href="/profile/Suggestion">Suggestions</a>
            <a href="/profile/Fav">Liked</a>
          </div>
          <div className="navbar-links">
            <a href="/trending">
              <p>Trending</p>
            </a>
            <a href="/profile/Suggestion">
              <p>Suggestions</p>
            </a>
            <a href="/profile/Fav">
              <p>Liked</p>
            </a>
          </div>
        </div>
        <div className="navbar-input_button">
          <div>
            <a className="search" href="/search/Search">
              <h2 id="none">Search </h2>
              <GlassSvg />
            </a>
          </div>

          {console.log("USER DB: ", props.user)}

          {props.user ? (
            props.user.profile_picture ? (
              <a href="/profile/Profile">
                {" "}
                <img className="pp" src={props.user.profile_picture} />
              </a>
            ) : (
              <a href="/profile/Profile">
                {" "}
                <p>pas de photo de profil </p>
              </a>
            )
          ) : (
            <>
              <div class="sb-container" id="none">
                <a href="/signin">Sign in / Sign up</a>
                <i class="fas fa-arrow-right"></i>
                <div className="bg"></div>
              </div>
              <div className="phone-signin" id="visible">
                <a href="/signin">
                  <h5>Sign in</h5>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
