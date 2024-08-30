import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovie } from "../utils/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies=()=>{
    const dispatch=useDispatch();
    const topRatedMovies= useSelector(store=> store.movies.topRatedMovies)

  const getTopRatedMovie= async ()=>{
    const data= await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS);
    const json = await data.json();
    
    dispatch(addTopRatedMovie(json.results));
  }

  useEffect(()=>{
   !topRatedMovies && getTopRatedMovie();
  }, []);

}

export default useTopRatedMovies;