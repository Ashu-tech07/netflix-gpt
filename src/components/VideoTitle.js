import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-full aspect-video px-6 md:px-24 pt-36 absolute pt-[20%] bg-gradient-to-r from-black text-white'>
      <h1 className='font-bold text-xl md:text-4xl'>{title}</h1>
      <p className='hidden md:inline-block py-6 text-lg w-1/2'>{overview}</p>
      <div>
        <button className='bg-gray-600 bg-white text-black text-xl py-1 md:py-4 px-3 md:px-12  rounded-lg mx-2 my-2 md:m-0 hover:bg-opacity-80'> ▶ Play</button>
        <button className='hidden md:inline-block bg-gray-600 text-xl  p-4 px-12 rounded-lg mx-2'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
