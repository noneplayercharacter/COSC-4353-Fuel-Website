import React from 'react'
import styles from './ModifyAccount.module.css'

//Function that get's the address of where the data is.
//Also keeps code organized

function ModifyAccount(){
    return(
    <div>
        <div className="container">
            <h1>Modify Account</h1>
            <form>
            <label htmlFor="full-name">Full Name:</label>
            <input
                type="text"
                id="full-name"
                name="full-name"
                maxLength={50}
                required=""
            />
            <label htmlFor="address1">Address 1:</label>
            <input
                type="text"
                id="address1"
                name="address1"
                maxLength={100}
                required=""
            />
            <label htmlFor="address2">Address 2:</label>
            <input type="text" id="address2" name="address2" maxLength={100} />
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" maxLength={100} required="" />
            <label htmlFor="state">State:</label>
            <select className = "container-input container-select" id="state" name="state" required="">
                <option value="" disabled="" selected="">
                Select State
                </option>
                <option value="AL">gotta add from DB</option>
            </select>
            <label htmlFor="zipcode">Zipcode:</label>
            <input
                type="text"
                id="zipcode"
                name="zipcode"
                pattern=".{5,}"
                maxLength={9}
                required=""
            />
            <button type="submit">Create Account</button>
            </form>
        </div>
    </div>
    )
}



export default ModifyAccount;