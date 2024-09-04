import { useState } from "react";
import { AxiosPanelista } from "../../axios/Axios.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../Shared/Header.jsx";
import Hero from "../Shared/Hero.jsx";

const SignUpForm = () => {
  //We use a lot of useStates as there is a lot of info to send to api

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    if (password === passwordRepeat) {
      // This part is just to check if the password and password repeat is the same
      //if it is not same we dont need to send a request to motion backend
      try {
        const response = await AxiosPanelista.patch(
          //With all the stored values we send a request to validate our registiration
          "/registration/validation/",
          {
            email: email,
            code: code,
            password: password,
            password_repeat: password,
            first_name: firstname,
            last_name: lastname,
          }
        );
        if (response.status === 200) {
          setSuccess("Registration successful! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        }
      } catch (error) {

        setError(error.response.data.message);
      }
    } else {
      alert("Please make sure your passwords match"); // Error if passwords dont match
    }
  };
  return (
    //Take the values from form set them in useStates
    <>
      <Header />
      <Hero />
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 ">Verification</h1>
        <form
          id="signupform"
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
        >
          <div className="form-control">
            <label className="label flex w-80">
              <p className="text-lg">
                Validation code <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="text"
              required
              placeholder="Validation code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label flex w-80">
              <p className="text-lg">
                Email <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label flex items-start w-80 ">
              <p className="text-lg">
                Your first name <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="text"
              required
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <p className="text-lg">
                Your last name <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="text"
              required
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label flex items-start w-80 ">
              <p className="text-lg">
                Password <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <p className="text-lg">
                Password repeat <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="password"
              required
              placeholder="Password repeat"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          </div>
        </form>
        <button form="signupform" className="btn-dark-sm w-fit mb-5" type="submit">
          Complete
        </button>
        {error && <small>{error}</small>}
        {success && <small>{success}</small>}
      </div>
    </>
  );
};

export default SignUpForm;
