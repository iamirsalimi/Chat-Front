import React, { useEffect, useState } from "react";
import "./../../public/css/auth.css";
import { useNavigate } from "react-router-dom";

let backend_api = 'https://chat-backend-4jgm.onrender.com'

function Auth() {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate()

    const authUser = async (event) => {
        event.preventDefault();

        const user = { username, phone }

        const res = await fetch(`${backend_api}/api/auth`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        // 201 status code means this user is new User , and he/she will register
        if (res.status == 200 || res.status == 201) {
            const data = await res.json()
            console.log('res -> ' , res , 'data -> ', data)
            localStorage.setItem('token', data.token)
            // location.href = '/'
            navigate('/Chat-front/')
        }

    };

    return (
        <form className="box" action="" method="POST" target="_self">
            <h1>login</h1>
            <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                name="name"
                id="username"
                placeholder="Username"
                autoComplete="off"
            />
            <input
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                name="phone"
                id="phone"
                placeholder="Phone"
                autoComplete="off"
            />
            <input
                type="submit"
                id="submit"
                value="Register / Login"
                onClick={authUser}
            />
        </form>
    );
}

export default Auth;
