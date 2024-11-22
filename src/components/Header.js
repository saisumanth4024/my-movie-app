import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="flex justify-between items-center absolute w-full px-8 py-2 bg-gradient-to-b from-black">
      <img className="w-32" src="Netflix_Logo_CMYK.png" alt="netflix_logo" />
      {user && (
        <div className="flex">
          <img
            className="w-14 h-12 mx-3 "
            src="netflix-profile-pictures-1000-x-1000-2fg93funipvqfs9i.jpg"
            alt="user-profile-icon"
          />
          <button
            className=" font-bold px-2 text-white border-[1px] rounded-md border-red-700 border-solid"
            onClick={handleSignOut}
          >
            LogOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
