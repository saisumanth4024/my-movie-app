import React from "react";
import lang from "../utils/languageConstants.js";
import { useSelector } from "react-redux";

const GptSearchPage = () => {
  const config = useSelector((store) => store.config.lang);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="pt-40 px-4 flex justify-center z-10 relative">
      <form
        className="flex items-center space-x-4 bg-[#1c18186d] w-[60%]  shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={lang[config].gptSearchPlaceHolder}
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="bg-red-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-800 transition duration-300"
        >
          {lang[config].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchPage;
