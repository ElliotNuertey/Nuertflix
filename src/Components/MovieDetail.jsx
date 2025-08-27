import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}`, API_OPTIONS)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      });

    // Fetch casts
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, API_OPTIONS)
      .then(res => res.json())
      .then(data => {
        setCasts(data.cast ? data.cast.slice(0, 5) : []);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found.</div>;

  return (
    <div className="flex flex gap-5">
      <div>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="flex flex-col gap-4">
        <h2>{movie.title}</h2>
        <p>Release date: {movie.release_date}</p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres && movie.genres.length > 0
            ? movie.genres.map((genre) => genre.name).join(", ")
            : "N/A"}
        </p>
        <p >Rating: {movie.vote_average}</p>
        <p className="prose max-w-[60ch] mx-auto">{movie.overview}</p>
        <div>
          <strong>Cast:</strong>
          <ul>
            {casts.length > 0 ? (
              casts.map(cast => (
                <li key={cast.cast_id || cast.id}>
                  {cast.name} as {cast.character}
                </li>
              ))
            ) : (
              <li>No cast information available.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;