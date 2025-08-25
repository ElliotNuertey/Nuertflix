import React from 'react'

const Search = ({searchMovie,  setsearchMovie}) => {
  return (
    <div className='search text-center '>
        <div>
            
        <input type="text" placeholder='Enter movie name here' className='w-[600px] ' value ={searchMovie}  onChange={(event)=> setsearchMovie(event.target.value)}/>
        </div>
    </div>
  );
}

export default Search