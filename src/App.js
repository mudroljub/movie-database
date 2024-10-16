import { useEffect, useState } from 'react'
import './App.css'

function removeDupes(arr) {
  const ids = new Set()
  return arr.filter(obj => {
    if (!ids.has(obj.id)) {
      ids.add(obj.id)
      return true
    }
    return false
  })
}

function App() {
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [currentMovies, setCurrentMovies] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch('/movies.json')
      .then(res => res.json())
      .then(data => {
        const filtered = removeDupes(data)
        setMovies(filtered)
        setCurrentMovies(filtered.slice(0, 20))
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const renderMovies = arr => arr.map(movie => (
    <div key={movie.id} className="movie">
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
      <p>{movie.title}</p>
      <p><span className="star-yellow">&#9733;</span> {movie.ratings[0].rating}</p>

      <span className="star-empty">&#9734;</span>
      <span className="star-black">&#9733;</span>
    </div>
  ))

  return (
    <div className="wrapper">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main className="movies">
        {loading
          ? '...loading'
          : renderMovies(currentMovies)
        }
      </main>
    </div>
  );
}

export default App;
