import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EventPage from "./EventPage";
import { useEffect, useState } from "react";
import { AxiosPanelista } from "../../axios/Axios.jsx";


const EventPageId = () => {
  const { eventId } = useParams();
  const token = useSelector((state) => state.user.accessToken);


  const [eventName, setEventName] = useState("");
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState("");
  const [street, setStreet] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState("");
  const [industry, setIndustry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [website, setWebsite] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [organizerFirstName, setOrganizerFirstName] = useState("");
  const [organizerLastName, setOrganizerLastName] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      AxiosPanelista.get(`/events/${eventId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          let event = res.data;
          setEventName(event.name);
          setCountry(event.country);
          setState(event.state);
          setCity(event.city);
          setZip(event.zip);
          setStreet(event.street);
          setDescription(event.description);
          setTopics(event.topics);
          setIndustry(event.industry);
          setStartDate(event.start_date);
          setEndDate(event.end_date);
          setWebsite(event.website);
          setType(event.type);
          setImage(event.image);
          setOrganizerFirstName(event.organizer.user.first_name);
          setOrganizerLastName(event.organizer.user.last_name);
        })
    };
    fetchEvent();
  }, [eventId, token]);

  return (
    <>
      <EventPage
        eventName={eventName}
        country={country}
        state={state}
        city={city}
        zip={zip}
        street={street}
        description={description}
        topics={topics}
        industry={industry}
        startDate={startDate}
        endDate={endDate}
        website={website}
        type={type}
        image={image}
        organizerFirstName={organizerFirstName}
        organizerLastName={organizerLastName}
      />
    </>
  );
};

export default EventPageId;
