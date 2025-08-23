const MovieCard = ({movie}) => {
  return (
   <div>
    <p key={movie.id}>{movie.title}</p>
   </div>
  )
}

export default MovieCard