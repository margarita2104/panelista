import Header from "../Shared/Header";
import Hero from "../Shared/Hero";
import { useDispatch, useSelector } from "react-redux";
import { get_events } from "../../store/slices/EventSlice";
import { Fragment, useEffect, useState } from "react";
import { AxiosPanelista } from "../../axios/Axios";
import Search from "../../assets/search.svg";
//import DownArrow from "../../assets/down-arrow.svg";
import { useNavigate } from "react-router-dom";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import EventAllImg from "../../assets/event-all-decor.jpg";

const EventsAll = () => {
  const token = useSelector((state) => state.user.accessToken);
  const events = useSelector((state) => state.event.events);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cities, setCities] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    date: "",
    about: "",
  });
  //    const [date, setDate] = useState(new Date())

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let eventsResponse;
        if (token) {
          eventsResponse = await AxiosPanelista.get("/events/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          eventsResponse = await AxiosPanelista.get("/events/");
        }
        dispatch(get_events(eventsResponse.data));
        setCities(eventsResponse.data.map((event) => event.city));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token, dispatch]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const submitFilterHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (token) {
      try {
        const eventsResponse = await AxiosPanelista.get("/events/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: filters,
        });
        dispatch(get_events(eventsResponse.data));
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
        <h1 className="text-3xl font-bold mb-6">Find an event</h1>

        {token && (
          <form
            className="px-10 w-full mb-16 bg-lighter shadow-lg rounded-3xl py-5 flex flex-row items-center justify-between"
            onSubmit={submitFilterHandler}
          >
            <ul className="flex flex-row text-2xl w-5/6 justify-between items-center">
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
                    {cities &&
                      cities
                        .filter(
                          (value, index) => cities.indexOf(value) === index
                        )
                        .sort()
                        .map((city, index) => (
                          <option value={city} key={index}>
                            {city.charAt(0).toUpperCase() + city.slice(1)}
                          </option>
                        ))}
                  </select>
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
              <li>
                <div className="flex mr-10 text-xl">
                  <span className="mr-2">Type</span>
                  <select
                    className="bg-transparent border-b border-black outline-none text-black"
                    name="type"
                    value={filters.type}
                    onChange={(e) => changeFilterHandler(e)}
                  >
                    <option value="">All</option>
                    <option value="Conference">Conference</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Corporate event">Corporate event</option>
                    <option value="Panel discussion">Panel discussion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </li>
            </ul>
            <button type="submit">
              <img className=" " src={Search} alt="Search" />
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10 px-8 w-full mb-16">
          {isLoading && <p>Loading events...</p>}
          {events?.length > 0 &&
            events.map((event) => (
              <div
                className="bg-lighter shadow-lg rounded-3xl flex flex-col"
                key={event.id}
              >
                <div className="flex-shrink-0 w-full">
                  <img
                    className="rounded-t-3xl w-full h-auto object-cover"
                    src={event.image || EventAllImg}
                    alt="Event image"
                  />
                </div>
                <div className="py-6 px-6 flex flex-col justify-between flex-grow">
                  <h3 className="text-2xl font-semibold mt-4 mb-2">
                    {event.name}
                  </h3>
                  <div className="mb-4 text-xl">
                    <p>
                      <span className="font-bold">Date: </span>
                      {formatDate(event.start_date)}
                    </p>
                    <p>
                      <span className="font-bold">Location: </span> {event.city}
                      , {event.country}
                    </p>
                    <p>
                      <span className="font-bold">Type: </span>
                      {event.type}
                    </p>
                    <p>
                      <span className="font-bold">Topics: </span> {event.topics}
                    </p>
                  </div>
                  {token && (
                    <button
                      className="btn-dark-sm w-fit self-start mt-auto"
                      type="button"
                      onClick={() => {
                        navigate(`${event.id}`);
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

export default EventsAll;
