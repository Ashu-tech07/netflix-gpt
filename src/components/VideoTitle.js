import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-full aspect-video px-24 pt-36 absolute pt-[20%] bg-gradient-to-r from-black text-white'>
      <h1 className='font-bold text-4xl'>{title}</h1>
      <p className='py-6 text-lg w-1/2'>{overview}</p>
      <div>
        <button className='bg-gray-600 bg-white text-black text-xl p-4 px-12  rounded-lg mx-2 hover:bg-opacity-80'> ▶ Play</button>
        <button className='bg-gray-600 text-xl  p-4 px-12 rounded-lg mx-2'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
