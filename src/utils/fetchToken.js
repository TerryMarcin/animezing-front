import Cookies from "js-cookie";

async function fetchToken() {
  try {
    let token = Cookies.get("token");
    if (!token) {
      throw "no token";
    }
    console.log(token);
    const response = await fetch("http://localhost:3001/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jwt: token }),
    });

    const data = await response.json();
    console.log(data);

    //si auth est true cela signifie que le token existe, est verifié, extrait,comparé avec celui de la bdd

    const auth = data.success;

    if (auth) {
      console.log("utilisateur authentifié");
      return data.user;
    } else {
      console.log("erreur auth");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default fetchToken;
