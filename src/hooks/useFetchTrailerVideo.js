import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useFetchTrailerVideo = (movieId) => {
  const [trailerKey, setTrailerKey] = useState(null);
  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );
      const json = await data.json();
      // console.log(json);

      const trailerVideosKey = json.results
        .filter((video) => video.type === "Trailer")
        .map((video) => video.key);
      // console.log(trailerVideosKey);

      setTrailerKey(
        trailerVideosKey.length > 0
          ? trailerVideosKey[
              Math.floor(Math.random() * trailerVideosKey.length)
            ]
          : []
      );
    } catch (error) {
      console.log(error);
    }
  };

  return trailerKey;
};

export default useFetchTrailerVideo;
