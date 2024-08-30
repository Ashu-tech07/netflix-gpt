import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";


const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((state) => state.gpt);
  if (!movieNames) return null;
   if(movieResults.length===0){
    return (
      <div className="p-4 m-4 bg-black text-white bg-opacity-80">
      <h1 className="font-bold text-3xl">Movies not found...!! Search another movie.</h1>
    </div>
    )
   }
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-80">
      <div>
        {/* <<<<<--- OpenAI movies rendering------>>>>>>>> */}
        {/* {
        movieNames.map((movieName, index)=>
        <MovieList key={movieName} title={movieName} movies={movieResults[index]} />)
        } */}
        {/* <<<<<<<<<<<<<<----END---->>>>>>>>>>>>>>>>>>> */}
        <h1 className="text-xl">Result for {movieNames}...</h1>
        <MovieList key={movieNames} title={movieNames} movies={movieResults}/>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
