import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase"; // Adjust the path to your firebase.js file
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { NETFLIX_BACKGROUNG_IMAGE, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // validate form data
    const errorMessage = checkValidData(
      email.current.value,
      password.current.value
    );
    setError(errorMessage);

    //if there is error message, then return from here, dont go ahead
    if (errorMessage) return;

    //if there id no error message then signIn/signUp logic
    if (!isSignInForm) {
      // --- SIGN UP LOGIC ---
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
          //update user's profile like displayName and profile photo
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              // ...
              const uid = auth.currentUser.uid;
              const email = auth.currentUser.email;
              const displayName = auth.currentUser.displayName;
              const photoURL = auth.currentUser.photoURL;
              // ...
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setError(`Sign up error: ${error.code} - ${error.message}`);
            });
        })
        .catch((error) => {
          setError(`Sign up error: ${error.code} - ${error.message}`);
        });
    } else {
      // --- SIGN IN LOGIC ---
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          // Update user data in Redux after sign-in
          const { uid, email, displayName, photoURL } = user;
          dispatch(
            addUser({
              uid,
              email,
              displayName: displayName || "Guest", // Fallback to "Guest"
              photoURL: photoURL || USER_AVATAR, // Fallback to a default image
            })
          );
        })
        .catch((error) => {
          setError(`Sign in error: ${error.code} - ${error.message}`);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative h-screen w-full">
      <div className="relative z-20">
        <Header />
      </div>

      {/* background image */}
      <div className="relative h-full w-full">
        <img
          src={NETFLIX_BACKGROUNG_IMAGE}
          alt="netflix-backgroung-image"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950/75 p-8 rounded-lg shadow-lg space-y-4"
      >
        <h1 className="text-3xl text-white font-bold py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Enter Full Name"
            className="w-full p-4 my-4 bg-gray-700 text-white rounded"
            ref={name}
          />
        )}
        <input
          type="text"
          placeholder="Enter email address"
          className="w-full p-4 my-4 bg-gray-700 text-white rounded"
          ref={email}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-4 my-4 bg-gray-700 text-white rounded"
          ref={password}
        />
        {<p className="text-red-600">{error}</p>}
        <button
          onClick={handleButtonClick}
          className="w-full p-4 my-6 bg-red-600 text-white rounded hover:bg-red-700"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="py-4 my-2 text-white cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix?Sign up now."
            : "Already a user? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
