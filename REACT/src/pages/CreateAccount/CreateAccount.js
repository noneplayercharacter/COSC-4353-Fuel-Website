import React, { useEffect, useState } from 'react';
import styles from './CreateAccount.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'



function CreateAccount(){
    const [validationError, setValidationError] = useState(null);
    const [message, setMessage] = useState(null);
    
    const handleSubmit = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log(username, password)
        // Send the data to the server using axios.post
        axios.post("http://localhost:5000/api/validatecreateAcc", {username, password})
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
            <h1>Create Account</h1>
            <form>
            <label htmlFor="username">Username:</label>
            <input type="text" 
            id="username"
            name="username"
            required
            maxLength={50}
            minLength={5}
            />
            <label htmlFor="password">Password:</label>
            <input type="password" 
            id="password" 
            name="password" 
            required
            maxLength={100}
            minLength={7}
            />
            {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
            <button type="button" onClick={handleSubmit}>Create Account</button>
            </form>
            {message && <div style={{ color: 'green' }}>{message}</div>}
        </div>
    </div>
    )
}



export default CreateAccount;