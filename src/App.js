import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch('/movies.json')
      .then(res => res.json())
      .then(setMovies)
      .finally(() => setLoading(false))
  }, [])

  console.log(movies)

  return (
    <div className="wrapper">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        {loading
          ? '...loading'
          : 'filmovi'
        }
      </main>
    </div>
  );
}

export default App;
