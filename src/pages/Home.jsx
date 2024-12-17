import { useState, useEffect } from "react";
import axios from "axios";
import { FilmDetails } from "../components/FilmDetails";

export const Home = () => {
	const [filmsList, setFilmsList] = useState(null);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
		},
	};

	const searchFilm = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
				options
			);
			setFilmsList(response.data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

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
	};

	const handleChange = (e) => {
		setSearch(e.target.value);
		setError(null);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		searchFilm();
	};

	useEffect(() => {
		fetchFilms();
	}, []);

	return (
		<>
			<h1>Liste de films</h1>
			<form className="flex justify-center gap-4" onSubmit={handleSubmit}>
				<input className="bg-zinc-500 rounded" type="text" value={search} onChange={handleChange} />
				<input className="bg-zinc-600 rounded hover:cursor-pointer hover:bg-zinc-500" type="submit" value="Rechercher" />
			</form>
			{error && <p>{error}</p>}
			{loading && <p>Chargement des films...</p>}
			<div className="flex flex-wrap justify-between gap-1 mt-2">
				{filmsList ? (
					!loading && filmsList.results.map((film) => <FilmDetails key={film.id} film={film} />)
				) : (
					<p>Aucun film trouvé</p>
				)}
			</div>
		</>
	);
};
