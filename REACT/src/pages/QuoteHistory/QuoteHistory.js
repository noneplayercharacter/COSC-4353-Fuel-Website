import React, { useEffect, useState } from 'react';
import styles from './QuoteHistory.module.css'

//Function that get's the address of where the data is.
//Also keeps code organized

function QuoteHistory(){
    const [data, setData] = useState({
        gallons: 0,
        address: "",
        date: "",
        price: 0,
        total: 0
      });
    useEffect(() => {
      fetch("/api/QuoteHistory")
      .then((res) => res.json())
      .then((data) => setData(data))
      }
    , []);

    return(
        <div>
            <div className={styles.container}>
                    <h1>Fuel Quote History</h1>
                    <table>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Delivery Address</th>
                        <th>Gallons</th>
                        <th>Suggested Price</th>
                        <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{data.date}</td>
                        <td>{data.address}</td>
                        <td>{data.gallons}</td>
                        <td>{data.price}</td>
                        <td>{data.total}</td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        </div>
    )
}





export default QuoteHistory;