import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";

const GptSearchBar = () => {
  const languageChange = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movieName) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    //make an api call to gpt api and get movie results

    //  const gptQuery =
    //    "Act as a Movie Recommendation system and suggest some movies for the query: " +
    //    searchText.current.value +
    //    ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmal, Koi mil gya";

    //  const gptResults = await openai.chat.completions.create({
    //    messages: [{ role: "user", content: gptQuery }],
    //    model: "gpt-3.5-turbo",
    //  });

    const gptMovies =
      "Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi do Yaaro, Padosan".split(
        ","
      );

    //for each movie, will try to search TMDB api
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //[promise, promise, promise, promise, promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
  };

  return (
    <div className="pt-[10%] flex justify-center ">
      <form
        className="w-1/2 bg-black grid grid-cols-12 rounded-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 bg-white"
          placeholder={lang[languageChange].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[languageChange].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
