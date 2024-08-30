import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {addPopularMovie } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies=()=>{
    const dispatch=useDispatch();
    const popularMovies= useSelector(store=> store.movies.popularMovies)

  const getPopularMovie= async ()=>{
    const data= await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS);
    const json = await data.json();
    
    dispatch(addPopularMovie(json.results));
  }

  useEffect(()=>{
   !popularMovies && getPopularMovie();
  }, []);

}

export default usePopularMovies;