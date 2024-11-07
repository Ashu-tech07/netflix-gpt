import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useTrailerVideo";


const VideoBackground = ({ moviesId }) => {

  const videoUrl=useTrailerVideo(moviesId);

  return (
    <div className="w-full">
      <iframe
      className=" w-[100%] md:mt-0 md:aspect-video aspect-square"
        // src={"https://www.youtube.com/embed/"+trailer?.key+"?&autoplay=1&mute=1"}
        src={videoUrl}
        title="YouTube video player"
        
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        
       
      ></iframe>
    </div>
  );
};

export default VideoBackground;
