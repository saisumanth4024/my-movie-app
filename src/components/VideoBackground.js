import React from "react";
import useFetchTrailerVideo from "../hooks/useFetchTrailerVideo";

const VideoBackground = ({ movieId }) => {
  const trailerKey = useFetchTrailerVideo(movieId);

  return (
    <div>
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&mute=1&iv_load_policy=3`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
