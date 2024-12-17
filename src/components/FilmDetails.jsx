import { Link } from "react-router-dom";

export const FilmDetails = ({ film }) => {
	return (
		<>
            <Link className="w-1/5 bg-zinc-500 rounded text-black hover:text-black" to={`/movie/${film.id}`}>
                <div className="w-full">
                    <h2>{film.original_title}</h2>
                    <p>Titre EN: {film.title}</p>
                    <p>Note: {film.vote_average}</p>
                    <img className="w-full" src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} />
                </div>
            </Link>
		</>
	);
};