import React,{useState} from "react";
import  styles from "../Design/Tracker.module.css";

const Tracker = () => {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Tracker(parseFloat(amount));
        setAmount('');
      };

    return(
    <div className={styles.wrapper}>
        <h1>Expenses Tracker</h1>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.wallet}>
          <h3>Wallet Balance : {amount}</h3>
          <button style={{backgroundColor: "lightgreen"}}>+ Add Income</button>
          </div>
          <div className={styles.wallet}>
          <h3>Expenses : 500</h3>
          <button style={{backgroundColor: "orange"}}>+ Add Expenses</button>
          </div>
          </div>
        </div>
    </div>
    )
}

export default Tracker;


