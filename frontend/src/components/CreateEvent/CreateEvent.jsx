import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosPanelista } from "../../axios/Axios";
import { create_event, get_events } from "../../store/slices/EventSlice";
import Header from "../Shared/Header";
import Hero from "../Shared/Hero";
import { useLocation } from "react-router-dom";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const CreateEvent = () => {
  const token = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();
  const location = useLocation();
  const initialData = location.state?.initialData || {};

  const [eventName, setEventName] = useState(initialData.name || "");
  const [country, setCountry] = useState(initialData.country || "");
  const [state, setState] = useState(initialData.city || "");
  const [city, setCity] = useState(initialData.city || "");
  const [zip, setZip] = useState(initialData.zip || "");
  const [street, setStreet] = useState(initialData.street || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [topics, setTopics] = useState(initialData.topics || "");
  const [industry, setIndustry] = useState(initialData.industry || "");
  const [startDate, setStartDate] = useState(initialData.start_date || "");
  const [endDate, setEndDate] = useState(initialData.end_date || "");
  const [website, setWebsite] = useState(initialData.website || "");
  const [type, setType] = useState(initialData.type || "Conference");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
     if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate the preview URL
    }

  }

  const handleButtonClick = () => {
    document.getElementById('fileInput').click()
  }

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", eventName.trim());
    formData.append("country", country.trim());
    formData.append("state", state.trim());
    formData.append("city", city.trim());
    formData.append("zip", zip.trim());
    formData.append("street", street.trim());
    formData.append("description", description.trim());
    formData.append("topics", topics.trim());
    formData.append("industry", industry.trim());
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("website", website.trim());
    formData.append("type", type);
    if (image) {
      formData.append("image", image);
    }

    if (token) {
      try {
        let response;
        if (initialData.id) {
          response = await AxiosPanelista.put(
            `/events/${initialData.id}/`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          response = await AxiosPanelista.post("/events/", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        dispatch(create_event(response.data));
        setSuccess("Event saved successfully!");

        const fetchData = async () => {
          try {
            const response = await AxiosPanelista.get("/events/", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            dispatch(get_events(response.data.results));
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      } catch (error) {
        setError("Failed to save event");
        console.error(error);
      } finally {
        setEventName("");
        setCountry("");
        setCity("");
        setZip("");
        setStreet("");
        setDescription("");
        setTopics("");
        setIndustry("");
        setStartDate("");
        setEndDate("");
        setWebsite("");
        setType("Conference");
        setImage(null);
      }
    }
  };

  return (
    <>
      <Header />
      <Hero />
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">
          {initialData.id ? "Edit Event" : "Create an Event"}
        </h1>
        <form
          id="createeventform"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          onSubmit={handleCreateEvent}
        >
          <div className="form-control">
            <label className="flex w-80">
              <p className="text-lg">
                Event name <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="text"
              required
              placeholder="Event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>
              <p className="text-lg">
                Country <span className="text-red-500">*</span>
              </p>
            </label>
            <CountrySelect
              type="text"
              placeholder="Select Country"
              className="input input-bordered input-primary w-full"
              value={country}
              onChange={(e) => {
                setCountry(e.name);
                setCountryId(e.id);
              }}
              name="country"
            />
          </div>
          <div className="form-control">
            <label>
              <p className="text-lg">
                State <span className="text-red-500">*</span>
              </p>
            </label>
            <StateSelect
              className="placeholder w-96 py-3 px-4 mb-4 bg-alto text-mulled-wine outline-none hover:bg-white"
              type="text"
              countryid={countryId}
              required
              placeholder="State"
              value={state}
              onChange={(e) => {
                setStateId(e.id);
                setState(e.name);
              }}
            />
          </div>
          <div className="form-control">
            <label>
              <p className="text-lg">
                City <span className="text-red-500">*</span>
              </p>
            </label>
            <CitySelect
              className="placeholder w-96 py-3 px-4 mb-4 bg-alto text-mulled-wine outline-none hover:bg-white"
              type="text"
              countryid={countryId}
              stateid={stateId}
              required
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.name)}
            />
          </div>
          <div className="form-control">
            <label>
              <p className="text-lg">Zip</p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="text"
              placeholder="Zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>
              <p className="text-lg">Street</p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="text"
              placeholder="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label flex items-start w-80 ">
              <p className="text-lg">
                Description <span className="text-red-500">*</span>
              </p>
            </label>
            <textarea
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              required
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <p className="text-lg">
                Topics <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="text"
              required
              placeholder="Topics"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label flex items-start w-80 ">
              <p className="text-lg">
                Industry <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="text"
              required
              placeholder="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <p className="text-lg">Website</p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="url"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <p className="text-lg">
                Start date <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="datetime-local"
              required
              placeholder="Start date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <p className="text-lg">
                End date <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              type="datetime-local"
              required
              placeholder="End date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <p className="text-lg">
                Type <span className="text-red-500">*</span>
              </p>
            </label>
            <select
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Conference">Conference</option>
              <option value="Seminar">Seminar</option>
              <option value="Corporate event">Corporate event</option>
              <option value="Panel discussion">Panel discussion</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <p className="text-lg">
                Image <span className="text-red-500">*</span>
              </p>
            </label>
            {previewImage && (<img src={previewImage} alt="profile picture" className="max-h-xs max-w-xs" />)}
            <div>
              <input
                  id="fileInput"
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden-file-input"
                  style={{display: 'none'}}
              />
              <button type="button" className="btn-dark-sm w-fit mt-8" onClick={handleButtonClick}>
                Update Image
              </button>
              </div>
            </div>
        </form>
        <button
          form="createeventform"
          className="btn-blue w-fit mb-5"
          type="submit"
        >
          {initialData.id ? "Save event" : "Create"}
        </button>
        {error && <small className="text-red-500">{error}</small>}
        {success && <small className="text-green-500">{success}</small>}
      </div>
    </>
  );
};

export default CreateEvent;
