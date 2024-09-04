import { useNavigate, useParams } from "react-router-dom";
import Header from "../Shared/Header";
import Hero from "../Shared/Hero";
import { useSelector } from "react-redux";
import { AxiosPanelista } from "../../axios/Axios";
import { useEffect, useState } from "react";
import EventAllImg from "../../assets/event-all-decor.jpg";

const EventPage = ({
  eventName,
  country,
  state,
  city,
  zip,
  street,
  description,
  topics,
  industry,
  startDate,
  endDate,
  website,
  type,
  image,
  organizerFirstName,
  organizerLastName,
}) => {
  const { eventId } = useParams();
  const token = useSelector((state) => state.user.accessToken);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AxiosPanelista.get("/user/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data[0];
        setIsOrganizer(
          user.is_organizer &&
            `${user.first_name} ${user.last_name}` ===
              `${organizerFirstName} ${organizerLastName}`
        );
        setIsSpeaker(user.is_speaker);
      } catch (error) {
      }
    };

    fetchUserData();
  }, [token, organizerFirstName, organizerLastName]);

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

  const handleEdit = () => {
    navigate("/createevent", {
      state: {
        initialData: {
          id: eventId,
          name: eventName,
          country,
          state,
          city,
          zip,
          street,
          description,
          topics,
          industry,
          start_date: startDate,
          end_date: endDate,
          website,
          type,
          image,
        },
      },
    });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await AxiosPanelista.delete(`/events/${eventId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 204) {
          navigate("/events");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleApplyEvent = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await AxiosPanelista.post(
        `/events/apply/${eventId}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSuccess(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <Hero />
      <div className="min-h-screen flex flex-col items-center">
        <div className="max-w-2xl mb-16 text-xl">
          <div>
            <img
              className="rounded-t-3xl"
              src={image || EventAllImg}
              alt={eventName}
            />
          </div>
          <div className="bg-lighter max-w-2xl py-10 px-16 rounded-b-3xl shadow-lg">
            <h2 className="text-3xl font-semibold mb-6">{eventName}</h2>
            <p>
              <span className="font-bold">Country:</span> {country}
            </p>
            <p>
              <span className="font-bold">State:</span> {state}
            </p>
            <p>
              <span className="font-bold">City:</span> {city}
            </p>
            <p>
              <span className="font-bold">Zip:</span> {zip}
            </p>
            <p>
              <span className="font-bold">Address:</span> {street}
            </p>
            <p>
              <span className="font-bold">Description:</span> {description}
            </p>
            <p>
              <span className="font-bold">Topics:</span> {topics}
            </p>
            <p>
              <span className="font-bold">Industry:</span> {industry}
            </p>
            <p>
              <span className="font-bold">Start date:</span>{" "}
              {formatDate(startDate)}
            </p>
            <p>
              <span className="font-bold">End date:</span> {formatDate(endDate)}
            </p>
            <p>
              <span className="font-bold">Website: </span>
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
            </p>
            <p>
              <span className="font-bold">Type:</span> {type}
            </p>
            <p className="mb-4">
              <span className="font-bold">Organizer:</span> {organizerFirstName}{" "}
              {organizerLastName}
            </p>
            {isOrganizer && (
              <div>
                <button onClick={handleEdit} className="btn-dark-xs w-fit mr-4">
                  Edit event
                </button>
                <button
                  onClick={handleDelete}
                  className="btn-dark-xs w-fit hover:bg-red-600"
                >
                  Delete event
                </button>
              </div>
            )}
            {isSpeaker && (
              <div>
                <button
                  className="btn-dark-xs w-fit"
                  type="button"
                  onClick={handleApplyEvent}
                >
                  Apply to the event
                </button>
              </div>
            )}
            {success && <div>{success}</div>}
            {error && <div>{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;
