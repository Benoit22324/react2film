import axios from "axios";
import { useEffect, useState } from "react"

export const ProfileInfo = ({user, setUser}) => {
    const [onEdit, setOnEdit] = useState(false);
    const [newUser, setNewUser] = useState({});

    const handleChange = (e) => {
        const value = e.target.value;
        const type = e.target.id;

        switch(type) {
            case "lname":
                setNewUser({...newUser, lastName: value});
                break;
            case "fname":
                setNewUser({...newUser, firstName: value});
                break;
            case "age":
                setNewUser({...newUser, age: parseInt(value) < 0 ? 0 : parseInt(value)});
                break;
            case "email":
                setNewUser({...newUser, email: value});
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3002/updateUser/${user._id}`, newUser);
            setUser(response.data);
            
            const {firstName, lastName, age, email} = response.data;
            setNewUser({firstName, lastName, age, email});
        } catch(err) {
            console.log(err)
        } finally {
            setOnEdit(false);
        }
    }

    useEffect(() => {
        if (user) {
            const {firstName, lastName, age, email} = user;
            setNewUser({firstName, lastName, age, email});
        }
    }, [])

    return <>
        <div>
            <button onClick={() => setOnEdit(!onEdit)}>{onEdit ? "Annuler" : "Modifier"}</button>
            {
                onEdit ?
                <>
                    <form className="w-fit mx-auto mt-5 flex flex-col items-center gap-2" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="lname">Nom: </label>
                            <input id="lname" type="text" className="bg-zinc-500 rounded" value={newUser.lastName} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="fname">Prénom: </label>
                            <input id="fname" type="text" className="bg-zinc-500 rounded" value={newUser.firstName} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="age">Age: </label>
                            <input id="age" type="number" className="bg-zinc-500 rounded" value={newUser.age} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input id="email" type="email" className="bg-zinc-500 rounded" value={newUser.email} onChange={handleChange} />
                        </div>
                        <input className="w-fit bg-green-600 rounded hover:cursor-pointer hover:bg-green-500" type="submit" value="Confirmer" />
                    </form>
                </>
                :
                <>
                    <p>Nom: {user.lastName}</p>
                    <p>Prénom: {user.firstName}</p>
                    <p>Age: {user.age}</p>
                    <p>Email: {user.email}</p>
                </>
            }
            
        </div>
    </>
}