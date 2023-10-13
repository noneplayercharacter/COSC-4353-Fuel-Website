import React, { useEffect, useState } from 'react'
import styles from './ModifyAccount.module.css'

//Function that get's the address of where the data is.
//Also keeps code organized

function ModifyAccount(){
    const [data, setData] = useState({
        fullName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
      });
    
      useEffect(() => {
        // Fetch user data from the backend
        fetch('/api/modifyAccount')
          .then((res) => res.json())
          .then((data) => setData(data));
      }, []);
    
      const handleFormSubmit = (e) => {
        e.preventDefault();
    
        // Send user data to the backend to update the account
        fetch('/api/modifyAccount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            // Handle the response from the server (success or error)
            alert(data.message);
          });
      };
    
    return(
    <div>
        <div className="container">
            <h1>Modify Account</h1>
            <form onSubmit={handleFormSubmit}>
            <label htmlFor="full-name">Full Name:</label>
            <input
                type="text"
                id="full-name"
                name="full-name"
                maxLength={50}
                required=""
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
            <label htmlFor="address1">Address 1:</label>
            <input
                type="text"
                id="address1"
                name="address1"
                maxLength={100}
                required=""
                value={data.address1}
                onChange={(e) => setData({ ...data, address1: e.target.value })}
            />
            <label htmlFor="address2">Address 2:</label>
            <input type="text" id="address2" name="address2" maxLength={100}  value={data.address2} onChange={(e) => setData({ ...data, address2: e.target.value })}/>
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" maxLength={100} required=""  value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })}/>
            <label htmlFor="state">State:</label>
            <select className = "container-input container-select" id="state" name="state" required="">
                <option value="" disabled="" selected="">
                Select State
                </option>
                <option value="AL">gotta add from DB</option>
                <option value={data.state}>TX</option>
            </select>
            <label htmlFor="zipcode">Zipcode:</label>
            <input
                type="text"
                id="zipcode"
                name="zipcode"
                pattern=".{5,}"
                maxLength={9}
                required=""
                value={data.zipcode}
                onChange={(e) => setData({ ...data, zipcode: e.target.value })}
            />
            <button type="submit">Create Account</button>
            </form>
        </div>
    </div>
    )
}



export default ModifyAccount;