export const Details = ({film, video}) => {
    return <>
        <h1>{film.original_title}</h1>
        <div className="flex items-center">
            <img className="w-1/4 mx-auto" src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} />
            <div className="w-1/2 flex flex-col items-center">
                <h2 className="font-bold text-2xl">Trailer</h2>
                {video && <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>}
            </div>
        </div>
        <div className="flex justify-between mt-8">
            <div className="w-1/2">
                <h2 className="font-bold text-2xl">Information</h2>
                {film.original_title !== film.title && <p>Titre EN: {film.title}</p>}
                <p>Genre: {film.genres.map((genre, index) => index > 0 ? <span key={index}>, {genre.name}</span> : <span key={index}>{genre.name}</span>)}</p>
                <p>Note: {film.vote_average}/10</p>
                <p>Doublage: {film.spoken_languages.map((language, index) => index > 0 ? <span key={index}>, {language.english_name}</span> : <span key={index}>{language.english_name}</span>)}</p>
                <p>Popularité: {film.popularity}</p>
            </div>
            <div className="w-1/2">
                <h2 className="font-bold text-2xl">Description</h2>
                <p>{film.overview}</p>
            </div>
        </div>
    </>
}