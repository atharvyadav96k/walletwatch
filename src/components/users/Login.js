import React from 'react'
import '../../App.css'
import axios from 'axios';
export default function Login() {
    const LoginUser = (e) => {
        e.preventDefault();
        const username = e.target.username.value;   
        const password = e.target.password.value;
        const data = {
            username: username,
            password: password
        };

        axios.post('https://walletwatch-server.vercel.app/api/users/login', data)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    }

    return (
        <div className="container">
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={LoginUser} method='post' action='https://walletwatch-server.vercel.app/api/users/login'>
                <h3>Login Here</h3>

                <label for="username">Username</label>
                <input type="text" placeholder="username" name="username" />
                <label for="password">Password</label>
                <input type="password" placeholder="password" name="password" />

                <button>Log In</button>
            </form>
        </div>
    );
}
