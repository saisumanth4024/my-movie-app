import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import { Store } from "@mui/icons-material";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store?.movie);
  usePopularMovies();
  useTrendingMovies();
  return (
    <div className="px-12 -mt-44 w-full bg-black">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies.popularMovies} />
      <MovieList title={"Trending"} movies={movies.trendingMovies} />
      <MovieList title={"Upcoming Movies"} movies={movies.popularMovies} />
    </div>
  );
};

export default SecondaryContainer;
