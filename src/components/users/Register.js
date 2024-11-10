import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [loading, setLoading] = useState(false); // State to manage button disabled state
    const [error, setError] = useState(null); // State to store error message
    const router = useNavigate();

    const RegisterUser = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const data = {
            username: username,
            password: password,
            email: email
        };

        setLoading(true); // Disable the button when the request starts
        setError(null); // Reset error state before the request

        axios.post('https://walletwatch-server.vercel.app/api/users/register', data)
            .then(response => {
                console.log('Response:', response.data);
                setLoading(false);
                router('/login'); // Redirect to login page on success
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
                setLoading(false); // Re-enable the button after the error
                setError('An error occurred during registration. Please try again.'); // Set error message
            });
    };

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
            <div className="row w-100">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={RegisterUser} method="post" className="p-4 shadow-sm rounded border">
                        <h3 className="text-center mb-4">Register Here</h3>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" placeholder="Username" name="username" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Email" name="email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Password" name="password" required />
                        </div>

                        {/* Display error message if exists */}
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}

                        <div className="d-grid gap-2">
                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? 'Registering...' : 'Register'} {/* Change button text */}
                            </button>
                        </div>

                        <div className="text-center mt-3">
                            <p>Already have an account? <a href="/login">Log In</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
