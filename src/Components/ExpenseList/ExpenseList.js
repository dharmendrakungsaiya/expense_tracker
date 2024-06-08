import React from 'react';
import styles from '../ExpenseList/Expense.module.css';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  // Sort expenses by amount in descending order and get the top 3 expenses
  const topExpenses = [...expenses].sort((a, b) => b.amount - a.amount).slice(0, 3);

  return (
    <div className={styles.wrapper}>
    <div className={styles.listsContainer}>
      <div className={styles.expenseList}>
        <h2>Recent Transactions</h2>
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} className={styles.expenseItem}>
                <span>{expense.title} - {expense.category} - ${expense.amount} - {new Date(expense.date).toLocaleDateString()}</span>
                <div className={styles.actions}>
                  <button onClick={() => onEdit(expense)}>Edit</button>
                  <button onClick={() => onDelete(expense.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.topExpenses}>
        <h2>Top Expenses</h2>
        {topExpenses.length === 0 ? (
          <p>No expenses available.</p>
        ) : (
          <ul>
            {topExpenses.map((expense) => (
              <li key={expense.id} className={styles.expenseItem}>
                <span>{expense.title} - {expense.category} - ${expense.amount} - {new Date(expense.date).toLocaleDateString()}</span>
                <div className={styles.actions}>
                  <button onClick={() => onEdit(expense)}>Edit</button>
                  <button onClick={() => onDelete(expense.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
  );
};


export default ExpenseList;
