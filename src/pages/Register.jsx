import axios from "axios";
import { useState } from "react";

export const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("0");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleFNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
        setError(null);
    }
    const handleLNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
        setError(null);
    }
    const handleAgeChange = (e) => {
        const value = parseInt(e.target.value);
        value < 0 ? setAge(0) : setAge(value);
        setError(null);
    }
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setError(null);
    }
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setError(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "") return setError("All fields required");

        try {
            const data = {
                firstName,
                lastName,
                age,
                email,
                password,
            }

            const response = await axios.post("http://localhost:3002/register", data);
            setSuccess(response.data.message);
            setError(null);

        } catch(err) {
            setError(err.response.data.message);
            setSuccess(null);
        }
    }

    return <>
        <h1>Inscription</h1>
        {error && <p className="font-bold text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <form className="w-fit mx-auto mt-5 flex flex-col items-center gap-2" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="lname">Nom: </label>
                <input id="lname" type="text" className="bg-zinc-500 rounded" value={lastName} onChange={handleLNameChange}/>
            </div>
            <div>
                <label htmlFor="fname">Prénom: </label>
                <input id="fname" type="text" className="bg-zinc-500 rounded" value={firstName} onChange={handleFNameChange}/>
            </div>
            <div>
                <label htmlFor="age">Age: </label>
                <input id="age" type="number" className="bg-zinc-500 rounded" value={age} onChange={handleAgeChange}/>
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input id="email" type="email" className="bg-zinc-500 rounded" value={email} onChange={handleEmailChange}/>
            </div>
            <div>
                <label htmlFor="pword">Mot de passe: </label>
                <input id="pword" type="password" className="bg-zinc-500 rounded" value={password} onChange={handlePasswordChange}/>
            </div>
            <input className="w-fit bg-zinc-600 rounded hover:cursor-pointer hover:bg-zinc-500" type="submit" value="S'inscrire"/>
        </form>
    </>
}