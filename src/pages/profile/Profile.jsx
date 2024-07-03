import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

/* ---------------------------------------
----------------Profile-------------------
-----------------------------------------*/

const Profile = () => {
  let user = useOutletContext();
  console.log("utilisateur = ", user);
  //objet user dans le user
  console.log("utilisateur nom = ", user.user.name);

  const [success, setSuccess] = useState(false);

  const onsubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = user.user.email;
    console.log(name, email);
    const url = "http://localhost:3001/name";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        console.log("erreur");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="profile">
        <h2>Update Profile</h2>
        <div className="profile-container">
    {success ? <p className="manga-message">le nom d'utilisateur a été modifié</p> : null}
          <img src={user.user.profile_picture} alt="profile_picture" />
          {/* <form action="localhost:3001" method="post">
          <p>Username</p>
          <input type="text" placeholder={user.user.name} />
        <input type="submit"></input>
        </form> */}
          <form action="put" onSubmit={onsubmit}>
            <p>Username</p>
            <input
              className="profile-input"
              type="text"
              placeholder={user.user.name}
            />
            <input className="profile-submit" type="submit"></input>
          </form>

        </div>
      </div>
    </>
  );
};
export default Profile;
