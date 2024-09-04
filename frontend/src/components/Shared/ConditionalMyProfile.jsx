import { AxiosPanelista } from "../../axios/Axios.jsx";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const ConditionalMyProfile = ({ token }) => {
  const [navLink, setNavLink] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosPanelista.get("/user/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data[0]["is_speaker"]) {
          setNavLink(
            <NavLink
              to="/speaker/profile/me"
              className="hover:text-royal-blue"
            >
              My profile
            </NavLink>
          );
        } else {
          setNavLink(
            <NavLink
              to="/organizer/profile/me"
              className="hover:text-royal-blue"
            >
              My profile
            </NavLink>
          );
        }
      } catch (error) {

        setNavLink(null);
      }
    };
    fetchData();
  }, [token]);
  return <div>{navLink}</div>;
};

export default ConditionalMyProfile;
