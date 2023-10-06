import React from 'react'
import styles from './Login.module.css'
import {Link} from 'react-router-dom';

function Login(){
    return(
        <div>
            <div className="container">
                <h1>Login</h1>
                <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required="" />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required="" />
                <button type="submit">Login</button>
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