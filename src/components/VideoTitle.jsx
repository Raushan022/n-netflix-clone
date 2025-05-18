import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 px-12">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className=" py-6 text-lg w-1/2">{overview}</p>
      <div>
        <button className="bg-green-500 text-black p-4 px-12 text-xl rounded-lg cursor-pointer">
          ▶Play
        </button>
        <button className="mx-2 bg-gray-400 text-white p-4 px-12 text-xl rounded-lg cursor-pointer">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
