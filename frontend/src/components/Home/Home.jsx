import Header from "../Shared/Header.jsx";
import Hero from "../Shared/Hero.jsx";
import { Link } from "react-router-dom";
import Speaker from "../../assets/home-decor-sp.png"
import Organizer from "../../assets/home-decor-org.png"


const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <div className="min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 pl-20 pr-28">
          <div className="mr-14">
            <p className="mb-8 text-xl">
              HI!! More diversity on stages. Because you can not be what you can not see.
            </p>
            <p className="text-xl">
              With <strong>panelista</strong>, our aim is to provide access to a
              list of diverse speakers and panelistas, so it is easier for event
              organizers to increase diverse representation on stage.
            </p>
          </div>
          <div className="bg-lighter relative pt-40 pl-14 pr-14 pb-7 rounded-3xl shadow-lg text-center min-h-96 max-w-md flex flex-col justify-start">
            <img className="absolute -top-36 -right-5" src={Speaker} alt="Speaker" />
            <p className="mb-auto text-2xl font-bold text-left ">
              We enable speakers to take the stage on their own terms.
            </p>
            <Link to="/registration/speaker">
              <button className="btn-dark-sm mt-5">Join as a speaker</button>
            </Link>
          </div>
          <div className="bg-lighter relative pt-40 pl-14 pr-14 pb-7 rounded-3xl shadow-lg text-center min-h-96 max-w-md flex flex-col justify-end">
            <img className="absolute -top-32 -right-5" src={Organizer} alt="Organizer" />
            <p className="mb-auto text-2xl font-bold text-left ">
              We connect event organizers with diverse speakers and panelists.
            </p>
            <Link to="/speakers">
              <button className="btn-dark-sm mt-5">Find a speaker</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
