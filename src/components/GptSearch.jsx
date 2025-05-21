import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { NETFLIX_BACKGROUNG_IMAGE } from "../utils/constants";

const GptSearch = () => {
  return (
    <>
      <div className="fixed h-full w-full -z-10">
        <img
          src={NETFLIX_BACKGROUNG_IMAGE}
          alt="netflix-backgroung-image"
          className="h-full w-full object-cover"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </>
  );
};

export default GptSearch;
