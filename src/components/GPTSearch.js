import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GPTSearch = () => {
  return (
    <>
     <div className="fixed -z-20">
        <img
          src={BG_URL}
          alt="background_image"
         className="w-screen h-screen object-cover"
        />
      </div>
      <div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
    </>
   
  )
}

export default GPTSearch
