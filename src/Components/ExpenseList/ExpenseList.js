import React from 'react';

function ExpenseList({ expenses, editExpense, deleteExpense }) {
  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.title} - ${expense.amount} on {expense.date} [{expense.category}]
            <button onClick={() => editExpense(expense)}>Edit</button>
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
