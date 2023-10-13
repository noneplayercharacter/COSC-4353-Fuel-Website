import React, { useEffect, useState } from 'react';
import styles from './Home.module.css'
import {Link} from 'react-router-dom';

function Home(){
    const [data, setData] = useState([null])
    useEffect(() => {
      fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message))
      }
    , []);



    return(
        <div className={styles.center}>
            <p>{!data ? "Loading..." : data}</p>
            <div className={styles.vertical}>
            <Link to='/Quote' className={styles.button}>Get a Quote Now</Link>
            <Link to='/login' className={styles.button}>Login</Link>
            <Link to='/QuoteHistory' className={styles.button}>Previous Quotes</Link>
            </div>
        </div>
    )
}





export default Home;