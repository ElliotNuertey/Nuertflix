import { useEffect, useState } from "react"
import Search from "./Components/Search"
import Spinner from "./Components/Spinner";

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchMovie, setsearchMovie] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMovies = async () => {
    setLoading(true);
    setErrMessage("");
    try {
      const endpoint = `${API_BASE_URL}?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        setErrMessage('Failed to load movies. Please try again later.');
        return;
      }

      const data = await response.json();
      setMovies(data.results || []);
    } 
    
    catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrMessage('Failed to load movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {getMovies();}, []);

  return (
    <main>
      <div className="pattern " />
      <div className="wrapper">
        <header>
          <img src="/Display.webp" alt="Hero-picture" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium">
            Find All The Hottest <span className="font-bold text-blue-800">Movies</span> Here for Free💓
          </h1>

          <Search searchMovie={searchMovie} setsearchMovie={setsearchMovie} />
          <h1 className="text-black mt-4 text-lg sm:text-xl">{searchMovie}</h1>
        </header>

        <section className="All">
          <h2 className="mt-[70px]">Movies</h2>
          {loading ? (<p className="text-black"><Spinner /></p>) : (errMessage ? <p className="text-red-500">{errMessage}</p> : (
            <ul>
              {movies.map(movie => (
                <p className="text-black" key={movie.id}>{movie.title}</p>
              ))}
              </ul>
          
          ))}
        </section>
      </div>
    </main>
  )
}

export default App
