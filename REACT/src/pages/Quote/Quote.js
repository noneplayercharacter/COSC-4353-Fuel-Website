import React, { useEffect, useState } from 'react';
import styles from './Quote.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

//Specifies the server we want to grab data from
const fetchData = () => {
    return axios.get("http://localhost:5000/api/Quote")
                .then((res) => res.data);
}

function Quote(){
    //Sets initial state of data
    const [info, setData] = useState({
        gallons: 0,
        address: "",
        date: ""
      });

    const [validationError, setValidationError] = useState(null);
    //Live event listener that changes the total amount due
    const handleGallonsChange = (event) => {
        const newGallons = parseFloat(event.target.value);
        setData({ ...info, gallons: newGallons });
    };
    
    //react-query hook allows fetch and load of data from server
    const { isLoading, data, error, refetch }= useQuery(["data"], fetchData);
    
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

    //Submit function to send data to server
    const handleSubmit = () => {
        data.gallons = info.gallons;
        
        // Send the data to the server using axios.post
        axios.post("http://localhost:5000/api/validateQuote", data)
          .then((response) => {
            // Sets info.total to new amount to display.
            setData({ ...info, total: response.data.formData.total });
            setValidationError(null)
          })
          .catch((error) => {
            if (error.response && error.response.data && error.response.data.errors) {
                // Set the validation error state with the array of error messages
                setValidationError(error.response.data.errors);
              } else {
                // Handle other errors if needed
                setValidationError("An error occurred while processing your request.");
              }
          });
      };


    return(
        <div>
            <div className="container">
                <h1>Generate Fuel Quote</h1>
                <form>
                <label htmlFor="gallonsRequested">Gallons Requested:</label>
                <input
                    type="number"
                    id="gallonsRequested"
                    name="gallonsRequested"
                    required
                    min = "5"
                    max = "5000"
                    value={info.gallons}
                    onChange={handleGallonsChange}
                 />
                 {validationError && <div style={{ color: 'red' }}>{validationError}</div>}
                <label htmlFor="deliveryAddress">Delivery Address:</label>
                <input
                    type="text"
                    id="deliveryAddress"
                    name="deliveryAddress"
                    value={data.address}
                    readOnly
                />
                <label htmlFor="deliveryDate">Delivery Date:</label>
                <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    required
                    min={new Date().toISOString().split('T')[0]}
                />
                <label htmlFor="suggestedPrice">Suggested Price per Gallon:</label>
                <input
                    type="number"
                    id="suggestedPrice"
                    name="suggestedPrice"
                    value={data.price}
                    readOnly
                />
                <label htmlFor="totalAmountDue">Total Amount Due:</label>
                <input
                    type="number"
                    id="totalAmountDue"
                    name="totalAmountDue"
                    value={info.total}
                    readOnly
                />
                <button type="button" onClick={handleSubmit}>Generate Quote</button>
                </form>
            </div>
        </div>
    )
}





export default Quote;