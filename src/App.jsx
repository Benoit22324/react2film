import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [filmsList, setFilmsList] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
  };

  const searchFilm = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options);
      setFilmsList(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, options);
      setFilmsList(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
    setError(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFilm();
  }

  useEffect(() => {
    fetchFilms()
  }, [])

  return (
    <>
      <h1>Liste de films</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChange} />
        <input type="submit" value="Rechercher" style={{color: "#050505"}} />
      </form>
      {
        error && <p>{error}</p>
      }
      {
        loading && <p>Chargement des films ...</p>
      }
      {
        filmsList ? !loading && filmsList.results.map(film => <FilmDetails key={film.id} film={film}/>)
        : <p>Aucun film trouvé</p>
      }
    </>
  )
}

const FilmDetails = ({film}) => {
  return <>
    <div>
      <h2>{film.title}</h2>
      <p>Note: {film.vote_average}</p>
      <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} />
    </div>
  </>
}

export default App
