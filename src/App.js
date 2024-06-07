import React, { useState, useEffect } from 'react';
import AddExpenseForm from './Components/AddExpenseForm/AddExpenseForm';
import AddIncomeForm from './Components/AddIncomeForm/AddIncomeForm';
import ExpenseList from './Components/ExpenseList/ExpenseList';
import ExpenseSummary from './Components/ExpenseSummary/ExpenseSummary';
import ExpenseTrends from './Components/ExpenseTrends/ExpenseTrends';
import './App.css';
import Tracker from './Components/Design/Tracker';

function App() {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedBalance = localStorage.getItem('walletBalance');
    const savedExpenses = localStorage.getItem('expenses');
    if (savedBalance) setWalletBalance(parseFloat(savedBalance));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  useEffect(() => {
    localStorage.setItem('walletBalance', walletBalance);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [walletBalance, expenses]);

  const addExpense = (expense) => {
    if (walletBalance >= expense.amount) {
      setExpenses([...expenses, expense]);
      setWalletBalance(walletBalance - expense.amount);
    } else {
      alert('Insufficient balance');
    }
  };

  const addIncome = (amount) => {
    setWalletBalance(walletBalance + amount);
  };

  const editExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp);
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (id) => {
    const expenseToDelete = expenses.find(exp => exp.id === id);
    setExpenses(expenses.filter(exp => exp.id !== id));
    setWalletBalance(walletBalance + expenseToDelete.amount);
  };

  return (
    <div>
      {/* <h1 className='heading'>Expense Tracker</h1>
      <p>Wallet Balance: ${walletBalance}</p>
      <AddIncomeForm addIncome={addIncome} />
      <AddExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} editExpense={editExpense} deleteExpense={deleteExpense} />
      <ExpenseSummary expenses={expenses} />
      <ExpenseTrends expenses={expenses} /> */}
      <Tracker/>
    </div>
  );
}

export default App;
