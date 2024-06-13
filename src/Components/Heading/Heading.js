import React from "react";
import styles from '../Heading/heading.module.css';

const Header = () =>{
    return(
        <div className={styles.container}>
        <div className={styles.heading1}>
            <h2>Recent Transactions</h2>
        </div>
        <div className={styles.heading2}>
            <h2>Top Expenses</h2>
        </div>
        </div>
    )
}

export default Header;