import React from 'react'
import { IMG_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTrailerId } from '../redux/gptSlice';

const MovieCard = ({ posterPath, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!posterPath) return null;

  const handleRedirectToWatch = () => {
    dispatch(addTrailerId(id));
    navigate("/watch");
  };


  return (
    <div className='w-36 md:w-48 p-2 mx-2 rounded-lg'>
      <img src={IMG_URL + posterPath}
        alt='movie card'
        onClick={handleRedirectToWatch}
        className="rounded-md  cursor-pointer transform scale-100 transition-transform ease-in-out hover:scale-110"
      />
    </div>
  )
}

export default MovieCard
