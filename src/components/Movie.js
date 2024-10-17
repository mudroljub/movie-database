const favStyle = {
  background: 'transparent',
  border: 0,
  cursor: 'pointer',
}

const Movie = ({ movie, inFavorites, toggleFavorite }) => {

  const star = inFavorites
    ? <span className="star-full">&#9733;</span>
    : <span className="star-empty">&#9734;</span>

  const title = inFavorites
    ? 'Remove from favorites'
    : 'Add to favorites'

  return (
    <div key={movie.id} className="movie">
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="poster" />
      <div className="space-between">
        <span><span className="star-yellow">&#9733;</span> {movie.ratings[0].rating}</span>
        <button style={favStyle} onClick={() => toggleFavorite(movie.id)} title={title}>
          {star}
        </button>
      </div>
      <p className="title">{movie.title}</p>
      <span className="date">{new Date(movie.release_date).toLocaleDateString("sr-RS")}</span>
    </div>
  )
}

export default Movie
