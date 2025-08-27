import React from 'react'

const Search = ({ searchMovie, setsearchMovie }) => {
  return (
    <div className='search text-center w-full'>
      <div>
        <input
          type="text"
          placeholder='Enter movie name here'
          className='w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl p-3 sm:p-4 md:p-5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
          value={searchMovie}
          onChange={(event) => setsearchMovie(event.target.value)}
        />
      </div>
    </div>
  );
}

export default Search;