import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AxiosPanelista } from "../../axios/Axios.jsx";
import Header from "../Shared/Header.jsx";
import { useNavigate } from "react-router-dom";
import Hero from "../Shared/Hero.jsx";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const SpeakerSignUpForm = () => {
  const token = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const [userData, setUserData] = useState({
    current_job_title: "",
    topics: "",
    career_description: "",
    country: "",
    state: "",
    city: "",
    willingness_to_travel: "",
    pronouns: "",
    birth_year: "",
    professional_experience: "",
    cultural_background: "",
    speaker_experience: "",
    languages: "",
    engagement_types: "",
    max_event_size: "",
    general_availability: "",
    contact_preferences: "",
    linkedin_profile: "",
    website: "",
    additional_notes: "",
    confirmation: false,
  });
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchSpeakerData = async () => {
      try {
        const response = await AxiosPanelista.get("speakers/me/", config);
        if (response.status === 200) {
          let firstUserData= response.data[0]
          delete firstUserData.picture
          setUserData(firstUserData);
          setPreviewImage(response.data[0].picture);
        }
      } catch (error) {
          console.log(error.message)
      }
    };
    fetchSpeakerData();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate the preview URL
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleChange = (e) => {
    if (e.target) {
      const { name, value, files } = e.target;
      if (files && files.length > 0) {
        setUserData({ ...userData, [name]: files[0] });
      } else {
        setUserData({ ...userData, [name]: value });
      }
    } else if (e.capital) {
      setUserData({ ...userData, country: e.name });
      setCountryId(e.id);
    } else if (e.latitude) {
      setUserData({ ...userData, city: e.name });
    } else {
      setUserData({ ...userData, state: e.name });
      setStateId(e.id);
    }
  };
  // if (e.target) {
  //     const {name, value, files} = e.target;
  //     if (name === "picture") {
  //         setUserData({...userData, [name]: files[0]});
  //     } else {
  //         setUserData({...userData, [name]: value});
  //     }
  //     }
  // else
  //     if (e.capital) {
  //         setUserData({...userData, country: e.name});
  //         setCountryId(e.id)
  //     } else if (e.latitude) {
  //         setUserData({...userData, city: e.name});
  //     } else {
  //         setUserData({...userData, state: e.name});
  //         setStateId(e.id)
  //     }
  // };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      if (userData[key] || typeof userData[key] === "string") {
        formData.append(key, userData[key]);
      }
    });
    if (image) {
      formData.append("picture", image);
    }
    try {
      const response = await AxiosPanelista.patch(
        "/speakers/edit/me/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        navigate("/speaker/profile/me");
      }
    } catch (error) {
      console.error("Error submitting speaker data:", error);
    }
  };

  return (
    <>
      <Header />
      <Hero />
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Speaker Account</h1>
        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center"
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Current job title</span>
            </label>
            <input
              type="text"
              placeholder="Current job title"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.current_job_title}
              required={true}
              onChange={handleChange}
              name="current_job_title"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Pronouns</span>
            </label>
            <select
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.pronouns}
              onChange={handleChange}
              name="pronouns"
            >
              <option value="She/her">She/her</option>
              <option value="He/him">He/him</option>
              <option value="They/them">They/them</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Career description</span>
            </label>
            <textarea
              name="career_description"
              placeholder="Describe your career"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.career_description}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Topics</span>
            </label>
            <textarea
              name="topics"
              placeholder="Topics covered"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.topics}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Country</span>
            </label>
            <CountrySelect
              type="text"
              placeholder="Select Country"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.country}
              onChange={handleChange}
              name="country"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">State</span>
            </label>
            <StateSelect
              type="text"
              countryid={countryId}
              placeholder="Select State"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.state}
              onChange={handleChange}
              name="state"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">City</span>
            </label>
            <CitySelect
              type="text"
              countryid={countryId}
              stateid={stateId}
              placeholder="Select city"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.city}
              onChange={handleChange}
              name="city"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Willingness to travel</span>
            </label>
            <select
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.willingness_to_travel}
              onChange={handleChange}
              name="willingness_to_travel"
            >
              <option value="0km">0 km</option>
              <option value="50km">50 km</option>
              <option value="100km">100 km</option>
              <option value="100+km">100+ km</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Birth year</span>
            </label>
            <input
              type="number"
              placeholder="Birth year"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.birth_year}
              onChange={handleChange}
              name="birth_year"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">
                Professional experience
              </span>
            </label>
            <select
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.professional_experience}
              onChange={handleChange}
              name="professional_experience"
            >
              <option value="None">None</option>
              <option value="1-3y">1-3 years</option>
              <option value="3-5y">3-5 years</option>
              <option value="5-10y">5-10 years</option>
              <option value="10-15y">10-15 years</option>
              <option value="15-20y">15-20 years</option>
              <option value="20-25y">20-25 years</option>
              <option value="25+ y">More than 25 years</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Cultural background</span>
            </label>
            <textarea
              name="cultural_background"
              placeholder="Cultural background"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.cultural_background}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Languages</span>
            </label>
            <textarea
              name="languages"
              placeholder="Languages spoken"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.languages}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Speaker experience</span>
            </label>
            <select
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.speaker_experience}
              onChange={handleChange}
              name="speaker_experience"
            >
              <option value="None">None</option>
              <option value="1-5">1-5 engagements</option>
              <option value="5-10">5-10 engagements</option>
              <option value="10-20">10-20 engagements</option>
              <option value="20+">More than 20 engagements</option>
              <option value="Full-time">
                Full-time / professional speaker
              </option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Maximum event size</span>
            </label>
            <select
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.max_event_size}
              onChange={handleChange}
              name="max_event_size"
            >
              <option value="<25">Less than 25 attendees</option>
              <option value="25-100">25-100 attendees</option>
              <option value="100-500">100-500 attendees</option>
              <option value="500-1000">500-1000 attendees</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">General availability</span>
            </label>
            <textarea
              name="general_availability"
              placeholder="General availability"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.general_availability}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Contact preferences</span>
            </label>
            <textarea
              name="contact_preferences"
              placeholder="Preferred contact methods"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.contact_preferences}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">LinkedIn profile</span>
            </label>
            <input
              type="text"
              placeholder="LinkedIn URL"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.linkedin_profile}
              onChange={handleChange}
              name="linkedin_profile"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Website</span>
            </label>
            <input
              type="text"
              placeholder="Website URL"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.website}
              onChange={handleChange}
              name="website"
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Additional notes</span>
            </label>
            <textarea
              name="additional_notes"
              placeholder="Any additional notes"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              value={userData.additional_notes}
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-xl">Upload picture</span>
            </label>
            {previewImage && (
              <img
                src={previewImage}
                alt="profile picture"
                className="max-h-xs max-w-xs"
              />
            )}
            <div>
              <input
                id="fileInput"
                type="file"
                onChange={handleImageUpload}
                className="hidden-file-input"
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="btn-dark-sm w-fit mt-8"
                onClick={handleButtonClick}
              >
                Update Image
              </button>
            </div>
          </div>

          <div className="flex justify-center col-span-2 items-center">
            <label className="label">
              <span className="label-text text-xl">Confirm</span>
            </label>
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              value={userData.confirmation}
              onChange={handleChange}
              name="confirmation"
            />
          </div>

          <div className="flex justify-center col-span-2">
            <button className="btn-dark-sm mt-8 w-fit">Complete</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SpeakerSignUpForm;
