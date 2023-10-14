import React, { useEffect, useState } from 'react';
import styles from './Login.module.css'
import {Link} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


//This will be used later to fetch credentials from DB
const fetchData = () => {
    return axios.get("http://localhost:5000/api/login")
                .then((res) => res.data);
}
function Login(){
    const { isLoading, data, error, refetch }= useQuery(["data"], fetchData);

    const [validationError, setValidationError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        // Send the data to the server using axios.post
        axios.post("http://localhost:5000/api/validateLogin", {username, password})
          .then((response) => {
            setValidationError(null);
            setMessage(response.data.message)
          })
          .catch((error) => {
            if (error.response && error.response.data && error.response.data.errors) {
                // Set the validation error state with the array of error messages
                setMessage(null)
                setValidationError(error.response.data.errors);
              } else {
                // Handle other errors if needed
                setMessage(null)
                setValidationError("An error occurred while processing your request.");
              }
          });
      };
    
    return(
        <div>
            <div className="container">
                <h1>Login</h1>
                <form>
                <label htmlFor="username">Username:</label>
                <input type="text" 
                id="username"
                name="username" 
                required 
                />
                <label htmlFor="password">Password:</label>
                <input type="password" 
                id="password" 
                name="password" 
                required
                />
                {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
                {message && <div style={{ color: 'green' }}>{message}</div>}
                <button type="button" onClick={handleSubmit}>Login Account</button>
                <center>
                    <p>
                    If you don't have an account yet,{" "}
                    <Link to='/CreateAccount' className={styles.color}>click here</Link> to make one!
                    </p>
                </center>
                </form>
            </div>
        </div>
    )
}


export default Login;