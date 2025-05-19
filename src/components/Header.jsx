import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO, USER_AVATAR } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
            photoURL: photoURL || USER_AVATAR, // Fallback for photoURL
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

    //unsubscribe when component unmounts
    return () => unsubscribe(); // Cleanup: Stop listening to auth state changes
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
    <div className="absolute z-10 w-full px-12 py-2 bg-gradient-to-b from-black to-transparent flex justify-between">
      <img className="w-32 h-12" src={NETFLIX_LOGO} alt="netflix-logo" />
      {user && (
        <div className="flex p-2">
          <img src={user.photoURL} alt="user-icon-logo" className="w-10 h-10" />
          <button
            onClick={handleSignOut}
            className="mb-4 pl-2 font-bold text-white underline cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
