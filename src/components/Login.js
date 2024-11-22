import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const userName = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = (e) => {
    setSignInForm(!isSignInForm);
  };

  const handleButtonClick = (e) => {
    console.log(email);
    const errorMessageValue = checkValidData(
      userName.current?.value,
      email.current?.value,
      password.current?.value
    );

    if (errorMessageValue) {
      setErrorMessage(errorMessageValue);
      return;
    }
    //create a new user by signup/signin
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current?.value,
        password.current?.value
      )
        .then((userCredential) => {
          // Signed up

          console.log(userCredential);
          const user = userCredential.user;
          updateProfile(user, {
            displayName: userName.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              // Profile updated!
              // ...
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current?.value,
        password.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Header />
      <div>
        <img
          className=""
          src="https://assets.nflxext.com/ffe/siteui/vlv3/03ad76d1-e184-4d99-ae7d-708672fa1ac2/web/IN-en-20241111-TRIFECTA-perspective_149877ab-fcbd-4e4f-a885-8d6174a1ee81_large.jpg"
          // src="/Netflix_Logo_CMYK.png"
          alt="netflix_background"
        />
        <form
          className="w-[45%] px-20 py-12 bg-[#000000b3] flex-col text-white absolute top-40 mx-auto my-3uto right-0 left-0 flex"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              placeholder="User Name"
              className="px-3 py-3 my-3 w-[92%] rounded-md border-[1px] bg-transparent border-solid focus:outline-none   text-white focus:border-red-700"
              ref={userName}
            />
          )}
          <input
            type="text"
            placeholder="Email Address"
            className="px-3 py-3 my-3 w-[92%] rounded-md border-[1px] bg-transparent border-solid focus:outline-none  text-white  focus:border-red-700"
            ref={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-3 my-3  w-[92%] bg-transparent border-solid border-[1px] rounded-md  focus:outline-none focus:border-red-700"
            ref={password}
          />
          <button
            className="px-2 py-3 my-5 bg-red-700 rounded-md w-[92%]"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-red-700 font-bold mb-2">{` ${errorMessage}`}</p>
          <p
            className="hover:text-red-300 active:text-blue-200 focus:text-green-500 cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? " New to Netflix? Sign up now"
              : "Already registered Sign In now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
