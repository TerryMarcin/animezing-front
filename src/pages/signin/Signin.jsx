import Layout from "../../components/layout";

const Signin = () => {
  /* ---------------------------------------
-----récuperation des données rentrées----
-----------------------------------------*/

  const onsubmit = async (e) => {
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
    <main>
      <div className="bigimg">
        <div className="joinus">
          <h1>Join Us !</h1>
          <p>---------------------- or ----------------------</p>
          <form action="get" onSubmit={onsubmit}>
            <div className="joinus-input_text">
              <p>Your name</p>
              <input type="text" placeholder="Name" />
            </div>
            <div className="joinus-input_text">
              <p>Your email</p>
              <input type="email" placeholder="Email" />
            </div>
            <button className="joinus-button" type="submit">
              sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signin;
