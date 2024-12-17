import React, { useRef } from "react";
import lang from "../utils/languageConstants.js";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAi.js";
import { API_OPTIONS } from "../utils/constants.js";
import { addGptMovieResult } from "../utils/gptSlice.js";

const GptSearchPage = () => {
  const dispatch = useDispatch();
  const config = useSelector((store) => store.config.lang);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const searchText = useRef(null);

  const SearchMovieTmdb = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json;
  };

  const handleGptSearchClick = async () => {
    const gptQuery =
      "act as a movie recommendatio system and suggest some movies for the query:" +
      searchText.current.value +
      "only give me names of 5 movies , comma seperated like the example result given ahead. Exmaple Result: pushpa2,kanguva,don,interstellar";
    try {
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-4",
      });
      console.log(gptResults);
      console.log(gptResults.choices);
      // const gptMovies = gptResults.choices?.[0]?.message?.content.split(",")
    } catch (error) {
      console.log(error);
    }
    const gptMovies = [
      "pushpa 2",
      "salaar",
      "kanguva",
      "mechanic rocky",
      "red one",
    ];
    const promiseArray = gptMovies.map((movie) => SearchMovieTmdb(movie));
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-40 px-4 flex justify-center z-10 relative">
      <form
        className="flex items-center space-x-4 bg-[#1c18186d] w-[60%]  shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          ref={searchText}
          placeholder={lang[config].gptSearchPlaceHolder}
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          onClick={handleGptSearchClick}
          className="bg-red-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-800 transition duration-300"
        >
          {lang[config].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchPage;
