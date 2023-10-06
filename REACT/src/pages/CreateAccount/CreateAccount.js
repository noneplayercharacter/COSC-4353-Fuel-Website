import React from 'react'
import styles from './CreateAccount.module.css'

//Function that get's the address of where the data is.
//Also keeps code organized

function CreateAccount(){
    return(
    <div>
        <div className="container">
            <h1>Create Account</h1>
            <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required="" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required="" />
            <button type="submit">Login</button>
            </form>
        </div>
    </div>
    )
}



export default CreateAccount;