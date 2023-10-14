import React, { useEffect, useState } from 'react';
import styles from './QuoteHistory.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

//Function that get's the address of where the data is.
//Also keeps code organized
const fetchData = () => {
    return axios.get("http://localhost:5000/api/QuoteHistory")
                .then((res) => res.data);
}

function QuoteHistory(){
    //Default values for data
    const info = {
        date: "No data available",
        address: "No data available",
        gallons: "No data available",
        price: "No data available",
        total: "No data available",
      };
    
      const { isLoading, data, error, refetch }= useQuery(["data"], fetchData);
      
      if (isLoading) return "Loading...";
      if (error) return "An error has occurred: " + error.message;

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
                        <td>{data ? data.date: info.date}</td>
                        <td>{data ? data.address: info.address}</td>
                        <td>{data ? data.gallons: info.gallons}</td>
                        <td>{data ? data.price: info.price}</td>
                        <td>{data ? data.total: info.price}</td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        </div>
    )
}





export default QuoteHistory;