import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlayingMovies);
  if (!movies) return;

  const mainMovies = movies[Math.floor(Math.random() * movies.length)];

  // console.log(mainMovies);

  const { original_title, overview, id } = mainMovies;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
