import axios from "axios";
import { useEffect, useState } from "react";
import { ProfileInfo } from "../components/ProfileInfo";

export const Profile = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    // // // //
    const fetchUser = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3002/user/${id}`);
            setUser(response.data);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const jwtPayload = parseJwt(jwtToken);

        if (jwtPayload) fetchUser(jwtPayload.user);
    }, [])

    return <>
        <h1>Votre Profile</h1>
        {loading && <p>Chargement de votre profile</p>}
        {user && !loading && <ProfileInfo user={user} setUser={setUser} />}
    </>
}