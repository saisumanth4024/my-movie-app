import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, backgroundColor }) => {
  console.log(movies);
  return (
    <div className={`my-2 bg-${backgroundColor}`}>
      <h1 className="text-2xl text-white font-bold">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-hide">
        <div className="flex py-2 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-transparent">
          {movies?.map((eachMovie) => (
            <MovieCard key={eachMovie.id} posterPath={eachMovie?.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
