import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[18%] px-16 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className=" py-6 text-lg w-1/2">{overview}</p>
      <div>
        <button className="bg-white text-black py-2.5 px-8 text-xl rounded-sm cursor-pointer hover:opacity-80">
          ▷ Play
        </button>
        <button className="mx-3 bg-gray-600 text-white py-2.5 px-8 text-xl rounded-sm cursor-pointer hover:opacity-70">
          ① More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
