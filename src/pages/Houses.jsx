import axios from "axios";
import { useEffect, useState } from "react"
import { HouseDetails } from "../components/HouseDetails";

export const Houses = () => {
    const [houses, setHouses] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchHouses = async() => {
        try {
            const response = await axios.get("http://localhost:3002/houses");
            setHouses(response.data);
        } catch(err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchHouses();
    }, [])

    return <>
        <h1>Page des maisons</h1>
        {loading && <p>Chargement des maisons...</p>}
        <div className="flex gap-2 mt-5">
            {houses && !loading && houses.map(house => <HouseDetails key={house._id} house={house} />)}
        </div>
    </>
}