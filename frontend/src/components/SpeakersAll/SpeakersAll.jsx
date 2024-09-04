import Header from "../Shared/Header";
import Hero from "../Shared/Hero";
import { useDispatch, useSelector } from "react-redux";
import { get_speakers } from "../../store/slices/SpeakerSlice";
import { Fragment, useEffect, useState } from "react";
import { AxiosPanelista } from "../../axios/Axios";
import Search from "../../assets/search.svg";
import DownArrow from "../../assets/down-arrow.svg";
import Avatar from "../../assets/avatar.svg";
import { useNavigate } from "react-router-dom";
import { get_events } from "../../store/slices/EventSlice.js";
import { Link } from "react-router-dom";

const SpeakersAll = () => {
  const token = useSelector((state) => state.user.accessToken);
  const speakers = useSelector((state) => state.speaker.speakers);
  const [cities, setCities] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    current_job_title: "",
    about: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let speakersResponse;
        if (token) {
          speakersResponse = await AxiosPanelista.get("/speakers/create/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          speakersResponse = await AxiosPanelista.get("/speakers/create/");
        }

        dispatch(get_speakers(speakersResponse.data));
        setCities(speakersResponse.data.map((speaker)=>(
    speaker.city)
  ))
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token, dispatch]);

  const submitFilterHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (token) {
      try {
        const speakersResponse = await AxiosPanelista.get("/speakers/create/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: filters,
        });
        dispatch(get_speakers(speakersResponse.data));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const changeFilterHandler = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      <Header />
      <Hero />
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">
          Find a speaker or try our{" "}
          <Link className="underline hover:text-royal-blue" to="/docsbot">
            Chatbot
          </Link>{" "}
        </h1>

        {token && (
          <form
            className="px-10 w-full mb-16 bg-lighter shadow-lg rounded-3xl py-5 flex flex-row items-center justify-between"
            onSubmit={submitFilterHandler}
          >
            <ul className="flex flex-row text-2xl w-5/6 justify-between items-center ">
              <li>
                <div className="flex mr-10 text-xl">
                  <span className="mr-2">City</span>
                  <select
                      className="bg-transparent border-b border-black outline-none text-black"
                      name="location"
                      value={filters.location}
                      onChange={(e) => changeFilterHandler(e)}
                  >
                    <option value="">All</option>
                    {cities && (cities.filter((value, index) => cities.indexOf(value) === index).sort().map((city, index) => (
                        <option value={city} key={index}>{city.charAt(0).toUpperCase() + city.slice(1)}</option>
                    )))}
                  </select>
                </div>
              </li>
              <li>
                <div className="flex items-center mr-10 text-xl">
                  <span className="mr-2">Job title</span>
                  <input
                      className="bg-transparent border-b border-black outline-none text-black"
                      type="text"
                      name="current_job_title"
                      value={filters.current_job_title}
                      onChange={(e) => changeFilterHandler(e)}
                  />
                </div>
              </li>
              <li>
                <div className="flex mr-10 text-xl">
                  <span className="mr-2">About</span>

                  <input
                      className="bg-transparent border-b border-black outline-none text-black"
                    type="text"
                    name="about"
                    value={filters.about}
                    onChange={(e) => changeFilterHandler(e)}
                  />
                </div>
              </li>
            </ul>
            <button type="submit">
              <img src={Search} alt="Search" />
            </button>
          </form>
        )}

        <div className="flex flex-col justify-center py-12 px-20 gap-x-28 gap-y-10 w-full mb-16">
          {isLoading && <p>Loading speakers...</p>}
          {speakers?.length > 0 &&
            speakers.map((speaker) => (
              <div
                className="bg-lighter shadow-lg rounded-3xl flex py-12 px-20 items-center text-xl"
                key={speaker.id}
              >
                <div>
                  {token ? (
                    <img
                      className="max-w-40 mr-20 rounded-full"
                      src={speaker.picture || Avatar} // Default avatar if no avatar URL
                      alt={`${speaker.user.first_name} ${speaker.user.last_name} avatar`}
                    />
                  ) : (
                    <img
                      className="max-w-40 mr-20 rounded-full blur"
                      src={speaker.picture || Avatar} // Default avatar if no avatar URL
                      alt={`Speaker avatar`}
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-6">
                    {token ? (
                      `${speaker.user.first_name} ${speaker.user.last_name}`
                    ) : (
                      <span className="dummy-name blur">Name Hidden</span>
                    )}
                  </h3>
                  <div className="mb-6">
                    <p>
                      <span className="font-bold">Location: </span>
                      {speaker.city.charAt(0).toUpperCase() +
                        speaker.city.slice(1) +
                        ", " +
                        speaker.country}
                    </p>
                    <p>
                      {" "}
                      <span className="font-bold">About speaker: </span>{" "}
                      {speaker.career_description}{" "}
                    </p>
                    <p>
                      {" "}
                      <span className="font-bold">Topics: </span>{" "}
                      {speaker.topics}{" "}
                    </p>
                  </div>
                  {token && (
                    <button
                      className="btn-dark-sm w-fit"
                      type="button"
                      onClick={() => {
                        navigate(`${speaker.id}`);
                      }}
                    >
                      Learn more
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SpeakersAll;
