import React, { useState, useEffect } from 'react';
import Tracker from './Components/Design/Tracker';
import ExpenseList from './Components/ExpenseList/ExpenseList';



function App() {
  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("walletBalance")
      ? JSON.parse(localStorage.getItem("walletBalance"))
      : 5000
  );

  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses")?.length > 0
      ? JSON.parse(localStorage.getItem("expenses"))
      : []
  );

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

  const onEdit = (updatedExpense) => {
    const updatedExpenses = expenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp);
    setExpenses(updatedExpenses);
  };

  const onDelete = (id) => {
    const expenseToDelete = expenses.find(exp => exp.id === id);
    setExpenses(expenses.filter(exp => exp.id !== id));
    setWalletBalance(walletBalance + expenseToDelete.amount);
  };

  return (
    <div>
      <Tracker 
        walletBalance={walletBalance} 
        addExpense={addExpense} 
        addIncome={addIncome} 
        expenses={expenses}
      />
      <ExpenseList 
        expenses={expenses} 
        onEdit={onEdit} 
        onDelete={onDelete} 
      />
    </div>
  );
}


export default App;
