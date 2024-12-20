import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
    const { isAuthentificated, setIsAuthentificated } = useAuth();

    const logout = () => {
        if (isAuthentificated) {
            localStorage.removeItem("jwtToken");
            setIsAuthentificated(false);
        }
    }

    return <>
        <div className="w-full">
            <ul className="w-1/2 mx-auto flex justify-between items-center">
                <Link to="/"><li>Accueil</li></Link>
                <Link to="/houses"><li>Maisons</li></Link>
                {
                    isAuthentificated ? <>
                        <Link to="/profile"><li>Profile</li></Link>
                        <li><button onClick={logout}>Logout</button></li>
                    </>
                    :
                    <>
                        <Link to="/register"><li>Inscription</li></Link>
                        <Link to="/login"><li>Login</li></Link>
                    </>
                }
            </ul>
        </div>
    </>
}