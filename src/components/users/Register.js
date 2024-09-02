import React from 'react';
import axios from 'axios'
export default function Register() {
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
    
        axios.post('https://walletwatch-server.vercel.app/api/users/register', data)
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error.response ? error.response.data : error.message);
      });
    }
    
    return (
        <div className="container">
            <form method='post' onSubmit={RegisterUser} action='https://walletwatch-server.vercel.app/api/users/register'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="username" // Add name attribute to access it from e.target
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email" // Add name attribute to access it from e.target
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password" // Add name attribute to access it from e.target
                    />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Check me out
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}
