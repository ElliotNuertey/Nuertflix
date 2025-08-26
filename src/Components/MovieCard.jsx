import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, release_date } = movie;
  return (
    <div className='movie-card'>
      <Link to={`/movie/${id}`}>
        <div className="text-black gap-2 flex flex-col items-center">
          <div className='rounded-lg mt-2'>
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />    
          </div>
          <div className='flex flex-col items-center'>
            <span className='font-bold text-center'>{title}</span>
            <span className='text-gray-500'>{release_date}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard