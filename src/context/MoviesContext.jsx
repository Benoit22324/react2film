import { createContext, useContext, useState } from "react"

const MoviesContext = createContext(null)

export const MoviesProvider = ({children}) => {
    const [movies, setMovies] = useState(null);

    const MoviesContextValue = {
        movies,
        setMovies,
    }

    return <MoviesContext.Provider value={MoviesContextValue}>
        {children}
    </MoviesContext.Provider>
}

export const useMovies = () => {
    const context = useContext(MoviesContext);
    return context
}