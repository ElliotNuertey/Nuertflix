import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/trending/movie/week", API_OPTIONS)
      .then(res => res.json())
      .then(data => {
        setTrending(data.results ? data.results.slice(0, 5) : []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading trending movies...</div>;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Trending Now🔥🔥</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {trending.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </section>
  );
};

export default Trending;