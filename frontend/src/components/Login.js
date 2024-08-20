import React, { useState } from 'react'
import { useContext } from 'react'
import {Link} from 'react-router-dom'
import {LoginContext} from '../contexts/LoginContext'

export default function Login() {
    const { loginState, setloginState } = useContext(LoginContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const onSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            }),
        });

        if (response.status === 200) {
            setloginState(true)
        } else {
            console.log("unsuccessful login")
        }
    }
    return (
        // min-vh-100 align-items-center

        <div className="container d-flex justify-content-center text-center my-4">

            <form onSubmit={onSubmit}>
                <div>
                    <h1>Login</h1>
                </div>
                <div className="mb-3 form-floating">
                    <input style={{ "width": "170px" }} placeholder="" value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="username" />
                    <label for="username">Enter username</label>
                </div>
                <div className="mb-3 form-floating">
                    <input placeholder="" style={{ "width": "170px" }} value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" />
                    <label for="password">Enter password</label>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <div className='my-2'>
                    <Link>Sign Up</Link>
                </div>
                
                
            </form>
        </div>

    )
}
