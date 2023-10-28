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
                        <th>Created</th>
                        <th>Delivery Address</th>
                        <th>Gallons</th>
                        <th>Suggested Price</th>
                        <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data && data.data && data.data.length === 0 ?(
                    <tr>
                    <td colSpan="6">No data available</td>
                    </tr>
                    ) : (
                    (() => {
                        const rows = [];
                        if (data && data.data) {
                        for (let i = 0; i < data.data.length; i++) {
                          const item = data.data[i];
                          rows.push(
                            <tr key={i}>
                                <td>{item.delivery_date}</td>
                                <td>{item.date_created}</td>
                                <td>{data.address}</td>
                                <td>{item.gallons_requested}</td>
                                <td>{item.suggested_price}</td>
                                <td>{item.total}</td>
                            </tr>
                            );
                        }
                    }
                        return rows;
                      })()
                    )}
                    </tbody>
                    </table>
            </div>
        </div>
    )
}





export default QuoteHistory;