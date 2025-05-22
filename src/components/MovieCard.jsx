import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-3 ">
      <img
        alt="movie_card"
        src={IMG_CDN_URL + posterPath}
        className="transform transition-transform duration-300 hover:scale-112"
      />
    </div>
  );
};

export default MovieCard;
