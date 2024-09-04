import { useSelector } from "react-redux";
import { AxiosPanelista } from "../../axios/Axios";
import Header from "../Shared/Header";
import Hero from "../Shared/Hero";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ProfileCard = ({
  avatarSource,
  email,
  linkedin,
  website,
  firstName,
  lastName,
  currentJobTitle,
  culturalBackground,
  careerDescription,
  topics,
  country,
  state,
  city,
  languages,
  professionalExperience,
  speakerExperience,
  birthYear,
  willingnessToTravel,
  pronouns,
  maxEventSize,
  generalAvailibility,
  contactPreferences,
  additionalNotes,
  speakerId,
  isOrganizer,
}) => {
  const location = useLocation();
  console.log(location);
  let loc = location.pathname;
  let condition = loc.includes("me");
  const token = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile")) {
      try {
        const response = await AxiosPanelista.delete("/speakers/edit/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 204) {
          console.log("profile deleted successfully");
          navigate("/join");
        }
      } catch (error) {
        console.error("Error deleting profile:", error);
      }
    }
  };

  console.log('speakerid', speakerId)
  console.log('organizer', isOrganizer)

  return (
    <>
      <Header />
      <Hero />
      <div>
        <div className="flex py-12 px-20 mb-20 mx-auto bg-lighter rounded-3xl shadow-lg max-w-4xl">
          {/* Left Side */}
          <div className="w-1/3 flex flex-col items-center">
            <img
              src={avatarSource}
              alt={`${firstName} ${lastName}`}
              className="w-40 h-40 rounded-full shadow-lg mb-8"
            />
            <div className="flex flex-col justify-center items-center w-44">
              <a
                href={`mailto:${email}`}
                className="btn-blue-sm w-full text-center leading-10 mb-4"
              >
                E-Mail
              </a>
              <a
                href={linkedin}
                className="btn-blue-sm w-full text-center leading-10 mb-4"
              >
                LinkedIn
              </a>
              <a
                href={website}
                className="btn-blue-sm w-full text-center leading-10 mb-4"
              >
                Website
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-2/3 pl-24">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">
                {firstName} {lastName}
              </h1>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Current Position</h2>
              <p>{currentJobTitle}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Summary</h2>
              <p>{careerDescription}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Topics</h2>
              <p>{topics}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Country</h2>
              <p>{country}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">State</h2>
              <p>{state}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">City</h2>
              <p>{city}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Willingness to Travel</h2>
              <p>{willingnessToTravel}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Pronouns</h2>
              <p>{pronouns}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Birth Year</h2>
              <p>{birthYear}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Professional Experience</h2>
              <p>{professionalExperience}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Cultural Background</h2>
              <p>{culturalBackground}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Speaking Experience</h2>
              <p>{speakerExperience}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Languages</h2>
              <p>{languages}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Maximum Event Size</h2>
              <p>{maxEventSize}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">General Availability</h2>
              <p>{generalAvailibility}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Contact Preferences</h2>
              <p>{contactPreferences}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Additional Notes</h2>
              <p>{additionalNotes}</p>
            </div>

            <div className="flex space-x-4 items-center">
              {condition && (
                <>
                  <NavLink
                    to="/speakersignup"
                    className="btn-dark-xs leading-8"
                  >
                    Edit Profile
                  </NavLink>
                  <button
                    onClick={handleDelete}
                    className="btn-dark-xs hover:bg-red-600"
                  >
                    Delete profile
                  </button>
                </>
              )}
              {isOrganizer && (
                  <NavLink
                    to={`/createreviews/${speakerId}`}
                    className="btn-dark-xs leading-8"
                  >
                    Review
                  </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
