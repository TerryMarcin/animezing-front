import Layout from "../../components/layout";

const Signin = () => {
  return (
    <main>
      <div className="bigimg">
        <div className="joinus">
          <h1>Join Us !</h1>
          <p>_______________________ or ______________________</p>
          <form action="get">
            <div className="joinus-input_text">
              <p>Your name</p>
              <input type="text" placeholder="Name" />
            </div>
            <div className="joinus-input_text">
              <p>Your email</p>
              <input type="email" placeholder="Email" />
            </div>
            <div className="joinus-button" type="submit">
              sign in
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signin;
