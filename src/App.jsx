import { useEffect, useState } from 'react'
import './App.css'

import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

// import { useRef } from 'react' // valor que persiste entre render

function App () {
  // https://www.omdbapi.com/?apikey=79ff1ca3&s=avengers
  // API-Key: 79ff1ca3
  const { movies } = useMovies()
  // const inputRef = useRef()
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    // const { query } = Object.fromEntries(new window.FormData(event.target)) 
  }

  const handleChange=(event)=>{
    const newQuery = event.target.value
    if (newQuery.startsWith(' '))return //Sie empieza con ' ' no deja poner espacio al comienzo
    setQuery (event.target.value)
    
  }

  useEffect(()=>{
    if (query==='') {
      setError('No se puede buscar pelicula vacia')
      return
    }

    if (query.match(/^\d+$/)) {
      setError('No se pude buscar una pelicula con un numero')
      return
    }

    if(query.length <3){
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  },[query])


  return (
    <div className='page'>

      <header>
      <h1>Buscador de Películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input style={{border:'1px solid transparent', borderColor: error ? 'red': 'transparent'}} onChange={handleChange} value={query} name='query' placeholder='Avengers, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
