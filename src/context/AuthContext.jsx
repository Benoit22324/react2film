import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [isAuthentificated, setIsAuthentificated] = useState(false);

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");
        jwtToken && setIsAuthentificated(true);
    }, []);

    const AuthContextValue = {
        isAuthentificated,
        setIsAuthentificated,
    }

    return <AuthContext.Provider value={AuthContextValue}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context
}