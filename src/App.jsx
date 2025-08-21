import { useState } from "react"
import Search from "./Components/Search"



function App() {
const[searchMovie, setsearchMovie]= useState("");

  return (
    <main   className="flex flex-col items-center justify-center  p-4 ">
    
        <div className="pattern w-full h-40 md:h-60 mb-6" />
            <div className="wrapper w-full max-w-3xl flex flex-col items-center text-center">
                <header>
                    <img src="./public/Display.webp" alt="Hero-picture" />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">Find All The Hottest <span className="font-bold text-blue-800">Movies</span> Here for Free💓</h1>
                </header>

                <Search searchMovie={searchMovie} setsearchMovie ={setsearchMovie}/>
                <h1 className="text-black mt-4 text-lg sm:text-xl">{searchMovie}</h1>
            </div>

        
       
  
       
    </main>
  )
}

export default App
