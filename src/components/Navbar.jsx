import { Link } from "react-router-dom"

export const Navbar = () => {
    return <>
        <div className="w-full">
            <ul className="w-1/2 mx-auto flex justify-between">
                <Link to="/"><li>Accueil</li></Link>
                <Link to="/houses"><li>Maisons</li></Link>
                <Link to="/register"><li>Inscription</li></Link>
                <Link to="/login"><li>Login</li></Link>
            </ul>
        </div>
    </>
}