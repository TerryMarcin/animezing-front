import React from "react";

const Header = (props) => {
  const { getSearchAnime } = props;
  return (
    <header>
      <navbar className="navbar">
        <div className="navbar-logo_links">
          <div className="navbar-logo">
            <img src="images/oshi-no-ko.jpg" alt="logo" />
          </div>
          <div className="navbar-menu">
            <img src="" alt="svg" />
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
          {/* <div className="navbar-profile">
            <a href="#">
              <img src="images/academys-genius-swordmaster.jpg" alt="profile" />
            </a>
          </div> */}
        </div>
      </navbar>
    </header>
  );
};

export default Header;
