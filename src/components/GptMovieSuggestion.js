import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  return (
    <div className="p-20 bg-transparent text-white">
      <div>
        {movieNames.map((eachMovie, index) => (
          <MovieList
            key={eachMovie}
            title={eachMovie}
            movies={movieResults[index].results}
            backgroundColor="transparent"
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
