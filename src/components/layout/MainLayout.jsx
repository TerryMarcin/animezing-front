import Header from "./header";
import Footer from "./footer";
import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import fetchToken from "../../utils/fetchToken";

const MainLayout = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    console.log("Fetching user");

    fetchToken().then((user) => {
      console.log("user:", user);
      setUser(user);
    });
  }, []);

  if (user === undefined) {
    return <h1>LOADING...</h1>;
  }

  return (
    <div>
      <Header user={user} />
      <main>
        <Outlet context={{ user }} />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
