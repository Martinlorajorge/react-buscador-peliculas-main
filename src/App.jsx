import { useEffect, useState, useRef } from 'react'
import './App.css'

import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

// import { useRef } from 'react' // valor que persiste entre render


function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current= search===''
      return
    }

    if (search === '') {
      setError('No se puede buscar película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se pude buscar una película con un numero')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return {search,updateSearch,error}
}





function App () {
  // https://www.omdbapi.com/?apikey=79ff1ca3&s=avengers
  // API-Key: 79ff1ca3
  const { movies } = useMovies()
  // const inputRef = useRef()
  const {search, updateSearch, error} = useSearch()  

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(search)
    // const { query } = Object.fromEntries(new window.FormData(event.target))
  }

  const handleChange = (event) => {
    // const newQuery = event.target.value
    // if (newQuery.startsWith(' ')) return // Sie empieza con ' ' no deja poner espacio al comienzo
    updateSearch(event.target.value)
  }

  

  return (
    <div className='page'>

      <header>
        <h1>Buscador de Películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }} onChange={handleChange} value={search} name='search' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
