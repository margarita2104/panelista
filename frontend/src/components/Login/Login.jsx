import { useState } from "react";
import { AxiosPanelista } from "../../axios/Axios.jsx";
import { useDispatch } from "react-redux";
import { login_user } from "../../store/slices/UserSlice.js";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../Shared/Hero.jsx";
import Header from "../Shared/Header.jsx";

const Login = () => {
  const [email, setEmail] = useState("hejoxa3489@leacore.com");
  const [password, setPassword] = useState("1");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  //   const location = useLocation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await AxiosPanelista.post("/auth/token/", {
        email: email,
        password: password,
      });
      const accessToken = response.data.access;

      localStorage.setItem("accessToken", accessToken);
      dispatch(login_user(accessToken));

      const res = await AxiosPanelista.get("/user/me/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data[0]["is_speaker"] === true) {
        const fetchSpeaker = await AxiosPanelista.get("/speakers/me/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!fetchSpeaker.data[0].current_job_title) {
          navigate("/speakersignup");
        } else {
          navigate("/speaker/profile/me");
        }
      } else {
        navigate("/organizer/profile/me");
      }

      // const from = location.state?.from || {pathname: "/"};
      // navigate(from);
    } catch (error) {
      setError(error.response.data.detail);
    }
  };
  return (
    <>
      <Header />
      <Hero />
      <div className="min-h-screen flex flex-col items-center">
        <h1 className=" text-3xl font-bold mb-6 ">Log In</h1>
        <form className="flex flex-col items-center" onSubmit={submitHandler}>
          <input
            className="w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue "
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-96 py-3 px-4 mb-6 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-dark-sm w-fit" type="submit">
            Login
          </button>
        </form>
        {error && <div className="mt-4">{error}</div>}
      </div>
    </>
  );
};

export default Login;
