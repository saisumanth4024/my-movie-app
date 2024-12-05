import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 px-12 w-[40%] absolute aspect-video text-white ">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-ellipsis py-3 text-lg">{overview}</p>
      <div className="flex">
        <button className="bg-white border text-lg text-black px-8 py-2 mr-3 rounded-md flex items-center">
          <PlayArrowIcon /> Play
        </button>
        <button className="bg-[#6d6d6e] opacity-70 border text-lg  px-8 py-2 mr-3 rounded-md  items-center flex">
          <InfoIcon /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
