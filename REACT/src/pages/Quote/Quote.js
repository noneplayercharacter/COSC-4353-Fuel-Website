import React from 'react'
import styles from './Quote.module.css'

//Function that get's the address of where the data is.
//Also keeps code organized

function Quote(){
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
                    required=""
                />
                <label htmlFor="deliveryAddress">Delivery Address:</label>
                <input
                    type="text"
                    id="deliveryAddress"
                    name="deliveryAddress"
                    readOnly=""
                />
                <label htmlFor="deliveryDate">Delivery Date:</label>
                <input type="date" id="deliveryDate" name="deliveryDate" required="" />
                <label htmlFor="suggestedPrice">Suggested Price per Gallon:</label>
                <input
                    type="number"
                    id="suggestedPrice"
                    name="suggestedPrice"
                    readOnly=""
                />
                <label htmlFor="totalAmountDue">Total Amount Due:</label>
                <input
                    type="number"
                    id="totalAmountDue"
                    name="totalAmountDue"
                    readOnly=""
                />
                <button type="submit">Generate Quote</button>
                </form>
            </div>
        </div>
    )
}





export default Quote;