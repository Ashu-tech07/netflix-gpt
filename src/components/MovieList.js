import React from 'react'
import MovieCard from './MovieCard'
import { Divider } from '@mui/material'

const MovieList = ({title, movies}) => {
  return (
    <div className='px-6 bg-transparent'>
        <h1 className='text-lg md:text-3xl py-2 text-white'>{title}</h1>
    <div className='flex  overflow-x-scroll scrollbar-hide'>
      <div className='flex'>
        {movies && movies.map(movie=> <MovieCard key={movie.id} id={movie.id} posterPath={movie.poster_path}/>)}
        </div>
    </div>
    <br />
    <Divider sx={{ backgroundColor: "gray" }} />
    </div>
  )
}

export default MovieList
