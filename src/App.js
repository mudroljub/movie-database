import { useEffect, useState, useRef } from 'react'

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
  const [focusedIndex, setFocusedIndex] = useState(0)
  const itemRefs = useRef([])

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

  const handleKeyDown = e => {
    if (e.key === 'ArrowRight' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault()
      const nextIndex = (focusedIndex + 1) % itemRefs.current.length
      setFocusedIndex(nextIndex)
      itemRefs.current[nextIndex].focus()
    } else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault()
      const prevIndex = (focusedIndex - 1 + itemRefs.current.length) % itemRefs.current.length
      setFocusedIndex(prevIndex)
      itemRefs.current[prevIndex].focus()
    }
  }

  if (loading) return <img src={loader} alt="loading" />

  return (
    <div className="wrapper">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main className="movies" onKeyDown={handleKeyDown}>
        {currentMovies.map((movie, i) => (
          <Movie
            key={movie.id}
            ref={el => (itemRefs.current[i] = el)}
            movie={movie}
            inFavorites={favorites.has(movie.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </main>
    </div>
  )
}

export default App
