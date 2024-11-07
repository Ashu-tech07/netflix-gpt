import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/languageConstants'
import { API_OPTIONS, openAI } from '../utils/constants'
import { addMovieNames, addMovies } from '../redux/suggestionsSlice'



const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector(store => store.config.lang)
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS);

    const json = await data.json();

    return json.results;
  }

  const handleGptMovieSearchClick = async () => {

  // <<<<<<<<<<<<<<<<<<<<<<---OpenAI APIs is used to search movie--->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // const gptQuery= 'Act as a Movie recommendation system and suggest some movies for the query'+searchText?.current?.value +'. Only gives me name of 5 movies,comma seperated like the example result given ahead. Example result: Gadar, Sholey, Don, Golmaal, Koi Mil Gya';
    
    // const gptResults=await openAI.chat.completions.create({
    //   messages: [{ role: 'user', content: gptQuery }],
    //   model: 'gpt-3.5-turbo',
    // });
    // console.log(gptResults?.choices?.[0]?.message.content);

    // const gptMoviesArray= gptResults?.choices?.[0]?.message.content.split(', ');

    // let cleanedMoviesList = gptMoviesArray.map((movie)=> {
    //   return movie.replace(/\d+\.\s+/g, "").replace(/\n/g, "");
    // });

    // const promiseArray=cleanedMoviesList.map((movie)=>searchMovieTMDB(movie));

    // fulfillPromises(promiseArray); 

    // dispatch(addMovieNames(gptMoviesArray));

    // <<<<<<<<<<<<--- END of OpenAI APIs code ------>>>>>>>>>>>>>>>>>>>>>>>>>



    // <<<<<<<<<<<<<<<<----------TMDB API Search call without OpenAI----->>>>>>>>>>>>>>>>>>>>>>>>>
    const gptMovies = searchText.current.value;
    const tmdbResults = await searchMovieTMDB(gptMovies);
    dispatch(addMovieNames(gptMovies));
    dispatch(addMovies(tmdbResults));
    // <<<<<<<<<<<<<<<<<<<--------END of TMDB search call---->>>>>>>>>>>>>>>>>>>>>>>>


  }

  // const fulfillPromises = async (promise) => {
  //   const res = await Promise.all(promise);
  //   console.log(res);

  //   let actualResult = [];

  //   for (let index = 0; index < res.length; index++) {
  //     const element = res[index];

  //     for (let j = 0; j < element.length; j++) {
  //       actualResult.push(element[j]);
  //     }
  //   }

  //   actualResult = res.map((mov) => mov[0]);
  //   console.log(actualResult);

  //   dispatch(addMovies(actualResult));
  // };

  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
      <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
        <input ref={searchText} type='text' className='p-4 m-4 col-span-9 rounded-lg' placeholder={lang[langKey].gptSearchPlaceholder} />
        <button className='py-2 px-4 m-4 col-span-3 bg-red-700 text-white rounded-lg'
          onClick={handleGptMovieSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
