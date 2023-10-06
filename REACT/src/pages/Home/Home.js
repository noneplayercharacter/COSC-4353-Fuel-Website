import React from 'react'
import styles from './Home.module.css'
import {Link} from 'react-router-dom';
//Function that get's the address of where the data is.
//Also keeps code organized

function Home(){
    return(
        <div className={styles.center}>
            <div className={styles.vertical}>
            <Link to='/Quote' className={styles.button}>Get a Quote Now</Link>
            <Link to='/login' className={styles.button}>Login</Link>
            <Link to='/QuoteHistory' className={styles.button}>Previous Quotes</Link>
            </div>
        </div>
    )
}





export default Home;