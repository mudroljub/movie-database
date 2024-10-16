import { useEffect, useState } from 'react'

import { removeDupes } from './utils'
import loader from './loader.gif'

const pageSize = 50

function App() {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch('/movies.json')
      .then(res => res.json())
      .then(data => setMovies(removeDupes(data)))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const chooseStar = fav => fav
    ? <span className="star-full">&#9733;</span>
    : <span className="star-empty">&#9734;</span>

  const renderMovie = movie => (
    <div key={movie.id} className="movie">
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="poster" />
      <div className="space-between">
        <span><span className="star-yellow">&#9733;</span> {movie.ratings[0].rating}</span>
        {chooseStar(Math.random() < 0.5)}
      </div>
      <p className="title">{movie.title}</p>
      <span className="date">{new Date(movie.release_date).toLocaleDateString("sr-RS")}</span>
    </div>
  )

  const sorted = movies.sort((a, b) => b.ratings[0].rating - a.ratings[0].rating)
  const currentMovies = sorted.slice(0, pageSize)

  if (loading) return <img src={loader} alt="loading" />

  return (
    <div className="wrapper">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main className="movies">
        {currentMovies.map(renderMovie)}
      </main>
    </div>
  );
}

export default App;
