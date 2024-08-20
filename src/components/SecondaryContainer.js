import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies=useSelector(state=> state.movies)
  
  return (
   movies && (<div className=' bg-black'>
    <div className=' -mt-52 relative z-20'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Top Rated"} movies={movies.topRatedMovies}/>
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
      <MovieList title={"Upcoming"} movies={movies.upcomingMovies}/>
      <MovieList title={"Horror"} movies={movies.nowPlayingMovies}/>
      </div>
    </div>)
  )
}

export default SecondaryContainer
