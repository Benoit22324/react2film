import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { Details } from "../components/Details";

export const Movie = () => {
    const [film, setFilm] = useState(null);
    const [videos, setVideos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let {id} = useParams();

    const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
		},
	};

    const searchFilm = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, options);
            setFilm(response.data);
            await searchVideo(response.data.id);
            console.log(response.data)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const searchVideo = async (id) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
            setVideos(response.data);
            console.log(response.data)
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        searchFilm()
    }, [])

    // Finir de coder cette page qui va afficher toute les informations d'un films en particulier

    return <>
        {loading && <p>Chargement du film...</p>}
        {error && <p>{error}</p>}
        {film && videos && !loading && <Details film={film} video={videos.results.filter(video => video.type === "Trailer")[0]} />}
    </>
}