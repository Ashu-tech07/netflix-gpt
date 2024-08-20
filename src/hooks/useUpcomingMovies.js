import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovie } from "../utils/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies=()=>{
    const dispatch=useDispatch();

  const getUpcomingMovie= async ()=>{
    const data= await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS);
    const json = await data.json();
    
    dispatch(addUpcomingMovie(json.results));
  }

  useEffect(()=>{
    getUpcomingMovie();
  }, []);

}

export default useUpcomingMovies;