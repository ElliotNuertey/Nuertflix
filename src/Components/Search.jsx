import React from 'react'

const Search = ({searchMovie,  setsearchMovie}) => {
  return (
    <div className='search'>
        <div>
            
        <input type="text" placeholder='Enter movie name here' value ={searchMovie}  onChange={(event)=> setsearchMovie(event.target.value)}/>
        </div>
    </div>
  );
}

export default Search