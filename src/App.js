import { useEffect, useState } from 'react'

import Movie from './components/Movie'
import { removeDupes } from './utils'
import loader from './loader.gif'

const pageSize = 50

function App() {
  
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState(localStorage.getItem('favorites')
    ? new Set(JSON.parse(localStorage.getItem('favorites'))) 
    : new Set()
  )

  useEffect(() => {
    fetch('/movies.json')
      .then(res => res.json())
      .then(data => setMovies(removeDupes(data)))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const toggleFavorite = id => {
    const newFavorites = new Set(favorites)

    if (newFavorites.has(id))
      newFavorites.delete(id)
    else
      newFavorites.add(id)

    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)))
  }

  const sorted = movies.sort((a, b) => b.ratings[0].rating - a.ratings[0].rating)
  const currentMovies = sorted.slice(0, pageSize)

  if (loading) return <img src={loader} alt="loading" />

  return (
    <div className="wrapper">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main className="movies">
        {currentMovies.map(movie => <Movie movie={movie} inFavorites={favorites.has(movie.id)} toggleFavorite={toggleFavorite} />)}
      </main>
    </div>
  )
}

export default App
