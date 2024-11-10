import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigation = useNavigate();
    const [error, setError] = useState(null); // State to handle errors
    const [loading, setLoading] = useState(false); // State to manage button disabled state

    const LoginUser = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const data = {
            username: username,
            password: password
        };

        setLoading(true); // Disable button when the request starts

        axios.post('https://walletwatch-server.vercel.app/api/users/login', data)
            .then(response => {
                console.log('Response:', response.data.response);
                setError(null); // Clear any previous errors
                setLoading(false); // Enable the button again
                if (response.data.success === true) {
                    navigation(`/myspends/` + response.data.response.userId);
                }
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
                setError('Invalid username or password. Please try again.'); // Set error message
                setLoading(false); // Enable the button again after error
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
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
                            autoComplete="username"
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
                            autoComplete="current-password"
                        />
                    </div>

                    {/* Display error message if it exists */}
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100" 
                        disabled={loading} // Disable the button if loading is true
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <a href="/register" className="text-muted">Don't have an account?</a>
                </div>
            </div>
        </div>
    );
}
