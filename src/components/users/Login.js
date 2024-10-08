import React, { useState} from 'react';
import axios from 'axios';
import '../../App.css'; 
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigation = useNavigate();
    const [error, setError] = useState(null); // State to handle errors

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
                console.log('Response:', response.data.response);
                setError(null); 
                if(response.data.success === true){
                    navigation(`/myspends/`+ response.data.response.userId)
                }
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
                setError('Invalid username or password. Please try again.'); // Set error message
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: '300px' }}>
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={LoginUser}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            required
                            autoComplete="username" // Added for better form experience
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            autoComplete="current-password" // Added for better form experience
                        />
                    </div>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100">Log In</button>
                </form>
                <div className="mt-3 text-center">
                    <a href="#!" className="text-muted">Forgot Password?</a> {/* Changed href="#" to href="#!" to avoid potential warnings */}
                </div>
            </div>
        </div>
    );
}
