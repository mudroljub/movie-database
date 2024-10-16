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

  useEffect(() => {
    setLoading(true)
    fetch('/movies.json')
      .then(res => res.json())
      .then(data => setMovies(removeDupes(data)))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const renderMovies = arr => {
    return arr.map(movie => <div key={movie.id}>{movie.title}</div>)
  }

  return (
    <div className="wrapper">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        {loading
          ? '...loading'
          : renderMovies(movies)
        }
      </main>
    </div>
  );
}

export default App;
