import React from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout_user } from "../../store/slices/UserSlice";
import ConditionalMyProfile from "./ConditionalMyProfile.jsx";

function Header() {
  const token = useSelector((state) => state.user.accessToken);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout_user());
  };

  return (
    <header className="bg-white py-5 pl-20 pr-8 rounded-3xl text-lg flex justify-between items-center text-dark-blue">
      <nav className="flex flex-wrap items-center justify-start space-x-16 text-3xl w-full">
        <NavLink to="/" className="hover:text-royal-blue">
          Home
        </NavLink>
        <NavLink
          to="/about"
          className="hover:text-royal-blue"
        >
          About
        </NavLink>
        <NavLink
          to="/speakers"
          className="hover:text-royal-blue"
        >
          Find a speaker
        </NavLink>
        <NavLink
          to="/events"
          className="hover:text-royal-blue"
        >
          Events
        </NavLink>
        {token && <ConditionalMyProfile token={token} />}
      </nav>
      {token ? (
        <button onClick={handleLogout} className="btn-dark">
          Logout
        </button>
      ) : (
        <>
          <NavLink to="/join" className="btn-dark mr-3 ">
            Join
          </NavLink>
          <NavLink to="/login" className="btn-dark">
            Login
          </NavLink>
        </>
      )}
    </header>
  );
}

export default Header;
