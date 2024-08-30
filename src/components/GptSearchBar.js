import client from '../utils/openai'
import React ,{ useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/languageConstants'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'



const GptSearchBar = () => {
  const dispatch=useDispatch();
    const langKey=useSelector(store=> store.config.lang)
    const searchText=useRef(null);

    const searchMovieTMDB= async (movie)=>{
      const data=await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS);

      const json=await data.json();

      return json.results;
    }

    const handleGptMovieSearchClick=async ()=>{
      
      // // <<<---------------------------------OpenAI APIs is used to search movie--------------------------------->>>

      // const gptQuery= 'Act as a Movie recommendation system and suggest some movies for the query'+searchText?.current?.value +'. Only gives me name of 5 movies,comma seperated like the example result given ahead. Example result: Gadar, Sholey, Don, Golmaal, Koi Mil Gya';
      // const gptResults=await client.chat.completions.create({
      //   messages: [{ role: 'user', content: gptQuery }],
      //   model: 'gpt-3.5-turbo',
      // });

      // if(!gptResults?.choices){
      //   //error handling
      // }
      // console.log(gptResults?.choices?.[0]?.message.content);
      
      // const gptMovies= gptResults?.choices?.[0]?.message.content.split(', ');

      // const promiseArray=gptMovies.map((movie)=>searchMovieTMDB(movie));

      // const tmdbResults= await Promise.all(promiseArray);

      // console.log(tmdbResults);

      // <<<<<<<<<<<<--- END of OpenAI APIs code ------>>>>>>>>>>>>>>>>>>>>>>>>>
      const gptMovies= searchText.current.value;
      const tmdbResults=await searchMovieTMDB(gptMovies);
      console.log(gptMovies);
      console.log(tmdbResults);
      dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}))

    }

  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
        <input ref={searchText} type='text' className='p-4 m-4 col-span-9 rounded-lg' placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button className='py-2 px-4 m-4 col-span-3 bg-red-700 text-white rounded-lg'
        onClick={handleGptMovieSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
