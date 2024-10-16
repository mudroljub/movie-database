import { useEffect, useState } from 'react'

import { removeDupes } from './utils'
import loader from './loader.gif'

const pageSize = 20

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

  const renderMovies = arr => arr.map(movie => (
    <div key={movie.id} className="movie">
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="poster" />
      <p>{movie.title}</p>
      <p><span className="star-yellow">&#9733;</span> {movie.ratings[0].rating}</p>

      <span className="star-empty">&#9734;</span>
      <span className="star-black">&#9733;</span>
    </div>
  ))

  const currentMovies = movies.slice(0, pageSize)

  if (loading) return <img src={loader} alt="loading" />

  return (
    <div className="wrapper">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main className="movies">
        {renderMovies(currentMovies)}
      </main>
    </div>
  );
}

export default App;
