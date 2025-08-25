import React from 'react'

const MovieCard = ({movie:{title,poster_path,release_date, original_language}}) => {
  return (
    <div className='movie-card'>
      <div className="text-black gap-2 flex flex-col items-center">
        <div className='rounded-lg mt-2'>
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />    
        </div>
        <div className='flex flex-col items-center'><span className='font-bold text-center'>{title}</span><span className='text-gray-500'>{release_date}</span></div>
        
      </div>

    </div>
  )
}

export default MovieCard