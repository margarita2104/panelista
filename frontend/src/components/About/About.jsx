import Header from "../Shared/Header.jsx";
import Hero from "../Shared/Hero.jsx";
import About from "../../assets/about-decor.png";

const AboutPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <div className="min-h-screen flex flex-col ">
        <div className="flex pl-20 pr-28">
          <div className="text-center mr-32">
            <div className="py-7 px-14 text-2xl min-w-96 text-start shadow-lg font-semibold mb-10 bg-transparent-red rounded-3xl">
              Diversity enhances discussion
            </div>
            <div className="py-7 px-14 text-2xl min-w-96 text-start shadow-lg font-semibold mb-10 bg-lighter rounded-3xl">
              Representation matters
            </div>
            <div className="py-7 px-14 text-2xl min-w-96 text-start shadow-lg font-semibold bg-transparent-green rounded-3xl">
              Visibility & power to the speakers
            </div>
            <div className="py-10 px-14 text-2xl min-w-96">
              <img className="max-w-sm" src={About} alt="" />
            </div>
          </div>

          <div className="text-left space-y-4 text-xl">
            <p>
              Panelista was born out of the need of event organizers to create
              diverse panels to facilitate an interesting and engaging
              discussion between people with different backgrounds.
            </p>

            <p>
              We believe representation matters and role models are a key factor
              for more equity in the world.
            </p>

            <p>
              With panelista, our aim is to provide access to a list of diverse
              speakers and panelists, so it is easier for event organizers to
              increase diverse representation on stage.
            </p>

            <p>
              Our database is community-driven and open to speakers of any level
              of experience and expertise. We help speakers set clear
              expectations and take the stage on their own terms.
            </p>

            <p>
              Panelista wants to make diverse speakers and panelists visible.
              And we want speakers to be able to take matters into their own
              hands. Everybody can join our community of speakers. No fees. No
              checks.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
