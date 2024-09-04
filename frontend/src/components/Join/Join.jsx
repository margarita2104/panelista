import { Link } from "react-router-dom";
import Header from "../Shared/Header";
import Hero from "../Shared/Hero";
import JoinImg from "../../assets/join-decor.png";

const Join = () => {
  return (
    <>
      <Header />
      <Hero />

      <div className="flex min-h-screen px-20 items-start justify-around" >
        <div >
          <Link to="/registration/speaker" className=" btn-blue text-2xl" >Join as a speaker</Link>
        </div>
        <div>
          <img className="max-w-96 " src={JoinImg} alt="Join" />
        </div>
        <div >
          <Link to="/registration/organizer" className=" btn-blue text-2xl" >Join as an organizer</Link>
        </div>
      </div>
    </>
  );
};

export default Join;
