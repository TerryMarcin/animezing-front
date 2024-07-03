import Layout from "../../components/layout/MainLayout";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Signin = () => {
  const [isSend, setIsSend] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  /* ---------------------------------------
-----récuperation des données rentrées----
-----------------------------------------*/

  const onsubmit = async (e) => {
    setIsSend(true);
    setTimeout(() => setIsSend(false), 3000);
    e.preventDefault();
    console.log(e.target[0].value);
    const name = e.target[0].value;
    const email = e.target[1].value;
    console.log(name, email);
    const url = "http://localhost:3001/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include", // If you need to send cookies
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bigimg">
      <div className="joinus">
        {isSend ? (
          <div className="manga-message">
            <p>Email sent successfully</p>
          </div>
        ) : null}
        <h1>Join Us !</h1>
        {searchParams.get("from") && (
          <p>you need to sign in to access this page</p>
        )}
        <form action="get" onSubmit={onsubmit}>
          <div className="joinus-input_text">
            <p>Your name</p>
            <input type="text" placeholder="Name" />
          </div>
          <div className="joinus-input_text">
            <p>Your email</p>
            <input
              type="email"
              placeholder="Email"
              autocomplete="on"
              name="email"
              autocompletetype="email"
            />
          </div>
          <button className="joinus-button" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
