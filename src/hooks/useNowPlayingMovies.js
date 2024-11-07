import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovie } from "../redux/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies=()=>{
    const dispatch=useDispatch();
    const nowPlayingMovies= useSelector(store=> store.movies.nowPlayingMovies)

  const getNowPlayingMovie= async ()=>{
    const data= await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS);
    const json = await data.json();
    
    dispatch(addNowPlayingMovie(json.results));
  }

  useEffect(()=>{
    // if(!nowPlayingMovies){
    //   getNowPlayingMovie();
    // }
    // <<<<---OR--->>>>
    
    !nowPlayingMovies && getNowPlayingMovie();
    
  }, []);

}

export default useNowPlayingMovies;