import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const email = user.email;
        const displayName = user.displayName;
        const photoURL = user.photoURL;
        // ...
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName || "Guest", // Fallback for displayName
            photoURL:
              photoURL ||
              "https://plus.unsplash.com/premium_photo-1681882593262-b80ada0342f4?q=80&w=1919&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Fallback for photoURL
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate("/");  --> no need to route from here now as onAuthStateChanged will automatically take care of route when logged out
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black to-transparent flex justify-between">
      <img
        className="w-46"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix-logo"
      />
      {user && (
        <div className="flex p-2">
          <img src={user.photoURL} alt="user-icon-logo" className="w-12 h-12" />
          <button
            onClick={handleSignOut}
            className="mb-4 pl-2 font-bold underline cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
