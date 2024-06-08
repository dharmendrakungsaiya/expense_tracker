import React from 'react';
import styles from '../ExpenseList/Expense.module.css';
import ExpenseTrends from '../ExpenseTrends/ExpenseTrends';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {

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
        <ExpenseTrends expenses={expenses} />
      </div>
    </div>
  </div>
  );
};


export default ExpenseList;
