import React from "react";
import { useSelector } from "react-redux";
import TrailerHeader from "./TrailerHeader";
import useTrailerVideo from "../hooks/useTrailerVideo";
import { BG_URL } from "../utils/constants";


const WatchTrailer = () => {
  const trailerId = useSelector((state) => state.gpt.trailerId);
  const videoUrl = useTrailerVideo(trailerId);

  return (
    <div>
      <TrailerHeader />
      {videoUrl && (
        <div className="fixed">
          <img
            className="h-screen md:h-full object-cover"
            src={BG_URL}
            alt="bgimage"
          />
        </div>
      )}
      {videoUrl ? (
        <>
          <div className="  md:pt-0 pt-[10%]">
            <iframe
              className="absolute w-[100%] md:aspect-video aspect-square"
              src={videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </>
      ) : (
        <>
          <img
            src="https://st5.depositphotos.com/30046358/64962/v/600/depositphotos_649628858-stock-video-animated-debugging-tool-404-error.jpg"
            className="w-full"
          />
        </>
      )}
    </div>
  );
};

export default WatchTrailer;
