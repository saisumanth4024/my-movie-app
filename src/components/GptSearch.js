import React from "react";
import GptSearchPage from "./GptSearchPage";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { NETFLIX_BACKGROUND_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <div className=" w-full h-full">
      <img
        className="absolute -z-10"
        src={NETFLIX_BACKGROUND_URL}
        // src="/Netflix_Logo_CMYK.png"
        alt="netflix_background"
      />
      <GptSearchPage />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptSearch;
