import { Link } from "react-router-dom"

export const Navbar = () => {
    return <>
        <ul>
            <Link to="/"><li>Accueil</li></Link>
            <Link to="/houses"><li>Maisons</li></Link>
        </ul>
    </>
}