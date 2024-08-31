import React from 'react'
import {IMG_URL} from '../utils/constants'
const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='w-36 md:w-48 pr-4'>
      <img src={IMG_URL+posterPath}
       alt='movie card'/>
    </div>
  )
}

export default MovieCard
