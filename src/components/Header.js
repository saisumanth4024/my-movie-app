import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const config = useSelector((store) => store.config.changeLanguage);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
        // console.log("uid", uid);
        // console.log("email", email);
        // console.log("displayName", displayName);
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unsubscribed to the onAuth
    return () => unSubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate("/");
      })
      .catch((error) => {
        // An error happened.
        // navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="flex justify-between items-center absolute w-full px-8 py-2 bg-gradient-to-b from-black z-30">
      <img className="w-32" src="Netflix_Logo_CMYK.png" alt="netflix_logo" />
      {user && (
        <div className="flex">
          {showGptSearch ? (
            <>
              <select
                onChange={handleLanguageChange}
                className="bg-red-700 mr-2 font-bold px-2 text-white border-[1px] rounded-md z-40"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option
                    className="z-10"
                    key={lang.identifier}
                    value={lang.identifier}
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            ""
          )}

          <button
            className=" font-bold px-2 text-white border-[1px] rounded-md bg-red-700 border-solid"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <img
            className="w-12 h-12 mx-3 "
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
