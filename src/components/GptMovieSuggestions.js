import React from "react";
import { useSelector } from "react-redux";
import GptMovieList from "./GptMovieList";


const GptMovieSuggestions = () => {
  const { movieNames, movies} = useSelector((state) => state.suggestions);

  if (!movieNames) return null;

   if(movies.length===0){
    return (
      <div className="p-4 m-4 bg-black text-white bg-opacity-80">
      <h1 className="font-bold text-lg md:text-3xl">Movies not found...!! Search another movie.</h1>
    </div>
    )
   }
   
  return (
    <div className="">
      <GptMovieList movies={movies} title={"Top 10 movies"} />
    </div>
  );
};

export default GptMovieSuggestions;
