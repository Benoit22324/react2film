import axios from "axios";
import { useState } from "react"
import { useAuth } from "../context/AuthContext";

export const Login = () => {
    const { setIsAuthentificated } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        const type = e.target.type;

        switch(type) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }

        setError(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "" || password === "") return setError("All Field Required");

        try {
            const data = {
                email,
                password,
            }

            const response = await axios.post("http://localhost:3002/login", data);
            localStorage.setItem("jwtToken", response.data);
            setIsAuthentificated(true);

            setSuccess("User Connected");
            setError(null);
        } catch(err) {
            setError(err.response.data.message);
            setSuccess(null);
        }
    }

    return <>
        <h1>Login</h1>
        {error && <p className="font-bold text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <form className="w-fit mx-auto mt-5 flex flex-col items-center gap-2" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email: </label>
                <input id="email" type="email" className="bg-zinc-500 rounded" value={email} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="pword">Mot de passe: </label>
                <input id="pword" type="password" className="bg-zinc-500 rounded" value={password} onChange={handleChange}/>
            </div>
            <input className="w-fit bg-zinc-600 rounded hover:cursor-pointer hover:bg-zinc-500" type="submit" value="Se Connecter" />
        </form>
    </>
}