import React, { forwardRef } from 'react'

const favStyle = {
  background: 'transparent',
  border: 0,
  cursor: 'pointer',
}

const Movie = ({ movie, favorites, setFavorites }, ref) => {

  const toggleFavorite = id => {
    const newFavorites = new Set(favorites)

    if (newFavorites.has(id))
      newFavorites.delete(id)
    else
      newFavorites.add(id)

    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)))
  }

  const star = favorites.has(movie.id)
    ? <span className="star-full">&#9733;</span>
    : <span className="star-empty">&#9734;</span>

  const title = favorites.has(movie.id)
    ? 'Remove from favorites'
    : 'Add to favorites'

  return (
    <div
      ref={ref}
      tabIndex="0"
      className="movie"
    >
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="poster" />
      <div className="space-between">
        <span title="IMDB rating">
          <span className="star-yellow">&#9733;</span> {movie.ratings[0].rating}
        </span>
        <span style={favStyle} onClick={() => toggleFavorite(movie.id)} title={title}>
          {star}
        </span>
      </div>
      <p className="title">{movie.title}</p>
      <span className="date">{new Date(movie.release_date).toLocaleDateString("sr-RS")}</span>
    </div>
  )
}

export default forwardRef(Movie)
