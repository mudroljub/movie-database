import { useEffect, useState, useRef } from 'react'

import Movie from './components/Movie'
import { removeDupes } from './utils'
import loader from './loader.gif'

const pageSize = 50
const currentPage = 0

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

  useEffect(() => {
    if (itemRefs.current.length)
      itemRefs.current[0].focus()
  }, [movies])

  const sorted = movies.sort((a, b) => b.ratings[0].rating - a.ratings[0].rating)
  const currentMovies = sorted.slice(currentPage * pageSize, currentPage * pageSize + pageSize)

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
        <img src="/logo.png" alt="logo" height={100} />
        <h1 className="site-title">Movie Database</h1>
      </header>
      <main className="movies" onKeyDown={handleKeyDown}>
        {currentMovies.map((movie, i) => (
          <Movie
            key={movie.id}
            ref={el => (itemRefs.current[i] = el)}
            movie={movie}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </main>
    </div>
  )
}

export default App
