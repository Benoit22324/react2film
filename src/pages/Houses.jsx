import axios from "axios";
import { useEffect, useState } from "react"
import { HouseDetails } from "../components/HouseDetails";

export const Houses = () => {
    const [houses, setHouses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHouses = async() => {
        const jwtToken = localStorage.getItem("jwtToken");

        if (!jwtToken) {
            setError("Not Connected");
            setLoading(false);
            return
        }

        try {
            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                }
            }

            const response = await axios.get("http://localhost:3002/houses", options);
            setHouses(response.data);
        } catch(err) {
            console.log(err)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchHouses();
    }, [])

    return <>
        <h1>Page des maisons</h1>
        {error && <p className="font-bold text-red-600">{error}</p>}
        {loading && <p>Chargement des maisons...</p>}
        <div className="flex justify-center gap-2 mt-5">
            {houses && !loading && houses.map(house => <HouseDetails key={house._id} house={house} />)}
        </div>
    </>
}