import React, { useEffect, useState } from 'react';
import styles from './Quote.module.css'

//Function that get's the address of where the data is.
//Also keeps code organized

function Quote(){
    const [data, setData] = useState({
        gallons: 0,
        address: "",
        date: "",
        price: 0,
        amount: ""
      });
    useEffect(() => {
      fetch("/api/Quote")
      .then((res) => res.json())
      .then((data) => setData(data))
      }
    , []);

    const totalAmountDue = data.gallons * data.price;

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
                />
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
                    readOnly
                />
                <label htmlFor="totalAmountDue">Total Amount Due:</label>
                <input
                    type="number"
                    id="totalAmountDue"
                    name="totalAmountDue"
                    value={totalAmountDue}
                    readOnly
                />
                <button type="submit">Generate Quote</button>
                </form>
            </div>
        </div>
    )
}





export default Quote;