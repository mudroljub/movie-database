import { useEffect, useState, useRef } from 'react'

import Movie from './components/Movie'
import Pagination from './components/Pagination'
import { removeDupes } from './utils'
import loader from './loader.gif'

const pageSize = 60

function App() {
  const itemRefs = useRef([])
  const [loading, setLoading] = useState(true)
  const [allMovies, setAllMovies] = useState([])
  const [favorites, setFavorites] = useState(
    new Set(JSON.parse(localStorage.getItem('favorites') || '[]'))
  )
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    fetch('/movies.json')
      .then(res => res.json())
      .then(data => setAllMovies(removeDupes(data)))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (itemRefs.current.length)
      itemRefs.current[0].focus()
  }, [allMovies])


  const handleSearch = e => {
    setSearchString(e.target.value.toLowerCase())
  }

  const availableMovies = allMovies
    .filter(movie => !searchString || movie.title.toLowerCase().includes(searchString))
    .sort((a, b) => b.ratings[0].rating - a.ratings[0].rating)

  const endIndex = currentPage * pageSize
  const visibleMovies = availableMovies.slice(endIndex - pageSize, endIndex)

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
      <header className="space-between">
        <div>
          <img src="/logo.png" alt="logo" height={100} />
          <h1 className="site-title">Movie Database</h1>
        </div>
        <input type="search" className="search" placeholder="Search movies" onInput={handleSearch} />
      </header>

      <main className="movies" onKeyDown={handleKeyDown}>
        {visibleMovies.map((movie, i) => (
          <Movie
            key={movie.id}
            ref={el => (itemRefs.current[i] = el)}
            movie={movie}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </main>

      <Pagination
        data={availableMovies}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default App