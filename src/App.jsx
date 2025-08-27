import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./Components/Search"
import Spinner from "./Components/Spinner";
import MovieCard from "./Components/MovieCard";
import MovieDetail from "./Components/MovieDetail";
import Trending from "./Components/Trending";

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

  // Debounce search to optimize API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      getMovies(searchMovie);
    }, 400); // 400ms debounce

    return () => clearTimeout(handler);
    // eslint-disable-next-line
  }, [searchMovie]);

  const getMovies = async (query = "") => {
    setLoading(true);
    setErrMessage("");
    try {
      const endpoint = query
        ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`
        : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        setErrMessage('Failed to load movies. Please try again later.');
        setMovies([]);
        return;
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrMessage('Failed to load movies. Please try again later.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <main className="min-h-screen bg-white">
              <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8">
                <header className="flex flex-col gap-6">
                  <img
                    className="h-[200px] sm:h-[250px] md:h-[300px] w-full object-cover object-center rounded-lg"
                    src="/Display.webp"
                    alt="Hero-picture"
                  />
                  <h1 className="text-center m-5 text-2xl sm:text-3xl md:text-4xl font-medium">
                    Find All The Hottest <span className="font-bold text-blue-800">Movies</span> Here for Free💓
                  </h1>
                  <Search searchMovie={searchMovie} setsearchMovie={setsearchMovie} />
                  <h1 className="text-black mt-4 text-lg sm:text-xl">{searchMovie}</h1>
                </header>
                {!searchMovie && <Trending />}
                <h1 className="text-left my-10 mx-4 sm:mx-8 text-2xl sm:text-3xl md:text-4xl font-medium">
                  All Movies <span className="font-bold text-blue-800">{searchMovie}</span>
                </h1>
                <section className="All mt-6">
                  {loading ? (
                    <p className="text-black flex justify-center"><Spinner /></p>
                  ) : errMessage ? (
                    <p className="text-red-500 text-center">{errMessage}</p>
                  ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            </main>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  )
}

export default App;