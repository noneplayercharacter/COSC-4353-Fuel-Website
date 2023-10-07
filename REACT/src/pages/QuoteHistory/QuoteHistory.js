import React from 'react'
import styles from './QuoteHistory.module.css'

//Function that get's the address of where the data is.
//Also keeps code organized

function QuoteHistory(){
    return(
        <div>
            <div className={styles.container}>
                    <h1>Fuel Quote History</h1>
                    <table>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Quote Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>2023-09-22</td>
                        <td>$50.00</td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        </div>
    )
}





export default QuoteHistory;