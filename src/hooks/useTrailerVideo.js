import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

const useTrailerVideo=(moviesId)=>{
    const dispatch=useDispatch();

    const getMovieVideos = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/"+moviesId+"/videos?language=en-US",
          API_OPTIONS
        );
        const json = await data.json();
       
        const filterTrailer = json.results.filter(
          (video) => video.type === "Trailer"
        );
        const trailerDetails = filterTrailer.length ? filterTrailer[0] : json.results[0];

        dispatch(addTrailerVideo(trailerDetails));
      };
    
      useEffect(() => {
        getMovieVideos();
      }, []);
    
}

export default useTrailerVideo;