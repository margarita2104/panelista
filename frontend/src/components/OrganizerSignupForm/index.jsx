import { useEffect, useState } from "react";
import { AxiosPanelista } from "../../axios/Axios.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../Shared/Header.jsx";
import Hero from "../Shared/Hero.jsx";
import { useSelector } from "react-redux";

const OrganizerSignupForm = () => {
  const token = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const [image,setImage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  // const location = useLocation();
  // const initialData = location.state?.initialData;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "multipart/form-data",
    },
  };

  const [userData, setUserData] = useState({
    company: "",
    experience: "",
    email: "",
    phone: "",
  });

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


  useEffect(() => {
    const fetchOrganizerData = async () => {
      try {
        const response = await AxiosPanelista.get("/organizers/me/", config);
        if (response.status === 200) {
          let firstUserData= response.data[0]
          delete firstUserData.picture
          setUserData(firstUserData);
          setPreviewImage(response.data[0].picture);
        }
      } catch (error) {
      }
    };
    fetchOrganizerData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(userData).forEach((key) => {
      if (userData[key] || typeof userData[key] === "string") {
        // first check if userData[key] exists, then check if it is a string, because an "" when someone deletes something
        formDataToSend.append(key, userData[key]);
      }
      if(image) {
        formDataToSend.append("picture", image);
      }
    });

    try {
      const response = await AxiosPanelista.patch(
        "/organizers/edit/me/",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        navigate("/organizer/profile/me/");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error submitting organizer data:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <Hero />
      <div className="min-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Organizer Account</h1>
        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center"
        >
          <div className="form-control">
            <label className="label">
              <span className="text-lg">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-lg">Company</span>
            </label>
            <input
              type="text"
              placeholder="Company"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              name="company"
              value={userData.company}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-lg">Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Phone"
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-lg">Experience</span>
            </label>
            <select
              className="placeholder w-96 py-3 px-4 mb-4 bg-white rounded-3xl text-mulled-wine outline-none border-2 border-transparent hover:border-royal-blue"
              name="experience"
              value={userData.experience}
              onChange={handleChange}
            >
              <option value="">Select Experience</option>
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

          <div className="form-control">
            <label className="label">
              <span className="text-lg">Picture</span>
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

          <div className="flex justify-center col-span-2">
            <button className="btn-dark-sm w-fit mt-8" type="submit">
              Complete
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrganizerSignupForm;
