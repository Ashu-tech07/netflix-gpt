
import { API_OPTIONS } from "../utils/constants";
import { useEffect, useState } from "react";

const useTrailerVideo=(moviesId)=>{
    const [videoUrl,setVideoUrl]=useState(null);

    const getMovieVideos = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/"+moviesId+"/videos?language=en-US",
          API_OPTIONS
        );
        const json = await data.json();
       
        const filterData = json?.results?.filter(
          (video) => video?.type === "Trailer"
        );

        if (filterData[0]?.key){
          setVideoUrl(
            "https://www.youtube.com/embed/" +
              filterData[0]?.key +
              "?playlist=" +
              filterData[0]?.key +
              "&rel=0&loop=1&autoplay=1&mute=1"
          );
        }
      };
    
      useEffect(() => {
       getMovieVideos();
      }, []);
    
      return videoUrl;
}

export default useTrailerVideo;