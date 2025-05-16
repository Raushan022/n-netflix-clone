import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase"; // Adjust the path to your firebase.js file

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [error, setError] = useState();

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
      //signUp logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setError(errorCode + "-" + errorMessage);
        });
    } else {
      //signIn logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          //...
          setError(errorCode + "-" + errorMessage);
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
          src="https://assets.nflxext.com/ffe/siteui/vlv3/202ac35e-1fca-44f0-98d9-ea7e8211a07c/web/IN-en-20250512-TRIFECTA-perspective_688b8c03-78cb-46a6-ac1c-1035536f871a_large.jpg"
          alt="netflix-backgroung-image"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950/75 p-8 rounded-lg shadow-lg space-y-4"
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
