import { useState } from "react";
import { AxiosPanelista } from "../../axios/Axios.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Shared/Header.jsx";
import Hero from "../Shared/Hero.jsx";
import { Link } from "react-router-dom";


const SignUpEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const is_speaker = location.pathname.includes("speaker");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // On submit with the email value we post to motion backend for Registration
      const response = await AxiosPanelista.post("/registration/", {
        email: email,
        role: is_speaker ? "speaker" : "organizer",
      });
      setResponse(response); //If the response is positive we set it in useState so that page renders again
    } catch (error) {
      setError("Email Failed");
    }
  };

  if (response) {
    navigate("/registration/validation/");
  } else {
    return (
      //First we have only email input with a controlled form it is stored in a use state

      <>
        <Header />
        <Hero />
        <div className="min-h-screen ">
          <div className="flex flex-col justify-center items-center mb-10">
            <h1 className="text-3xl font-bold mb-6 ">Registration</h1>
            <form
              className="flex flex-col justify-center items-center"
              onSubmit={submitHandler}
            >
              <input
                className="placeholder w-96 py-3 px-4 mb-6 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon="mail"
              />
              <div>
                <button className="btn-dark-sm w-fit" type="submit">
                  Register
                </button>
                {error && <div className="text-red-600 mt-5 text-center">{error}</div>}
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center">
            <h3 className="text-xl mr-2">Already have an&nbsp;account?</h3>
            <Link className="text-xl underline hover:text-royal-blue" to="/login">
              Login
            </Link>
          </div>
        </div>
      </>
    );
  }
};

export default SignUpEmail;
