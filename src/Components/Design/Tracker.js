import React, { useState } from "react";
import styles from "../Design/Tracker.module.css";
import ExpenseSummary from "../ExpenseSummary/ExpenseSummary";

const Tracker = ({ walletBalance, addExpense, addIncome, expenses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddIncomeClick = () => {
      setModalType('income');
      setIsModalOpen(true);
  };

  const handleAddExpensesClick = () => {
      setModalType('expense');
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
      setAmount('');
      setTitle('');
      setCategory('');
      setDate('');
      setEditingIndex(null);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const value = parseFloat(amount);
      if (!isNaN(value)) {
          if (modalType === 'income') {
              addIncome(value);
          } else if (modalType === 'expense') {
              const expense = { id: new Date().getTime(), title, amount: value, category, date };
              if (editingIndex !== null) {
                  // Edit existing expense
              } else {
                  addExpense(expense);
              }
          }
      }
      handleCloseModal();
  };

  return (
      <div className={styles.wrapper}>
          <h1>Expenses Tracker</h1>
          <div className={styles.container}>
              <div className={styles.header}>
                  <div className={styles.wallet}>
                      <h3>Wallet Balance: {walletBalance}</h3>
                      <button 
                          style={{ backgroundColor: "lightgreen" }} 
                          onClick={handleAddIncomeClick}
                      >
                          + Add Income
                      </button>
                  </div>
      
                  <div className={styles.wallet}>
                      <h3>Expenses: {expenses.reduce((total, expense) => total + expense.amount, 0)}</h3>
                      <button 
                          style={{ backgroundColor: "orange" }} 
                          onClick={handleAddExpensesClick}
                      >
                          + Add Expenses
                      </button>
                  </div>
                  <div className={styles.expenseSummary}>
                  <ExpenseSummary expenses={expenses} />
              </div>
              </div>
          </div>
          {isModalOpen && (
              <div className={styles.modal}>
                  <div className={styles.modalContent}>
                      <h2>Add {modalType === 'income' ? 'Income' : 'Expense'}</h2>
                      <form onSubmit={handleSubmit}>
                          {modalType === 'expense' && (
                              <>
                                  <input 
                                      type="text" 
                                      value={title} 
                                      onChange={(e) => setTitle(e.target.value)} 
                                      placeholder="Enter title" 
                                      required 
                                  />
                                  <input 
                                      type="text" 
                                      value={category} 
                                      onChange={(e) => setCategory(e.target.value)} 
                                      placeholder="Enter category" 
                                      required 
                                  />
                                  <input 
                                      type="date" 
                                      value={date} 
                                      onChange={(e) => setDate(e.target.value)} 
                                      required 
                                  />
                              </>
                          )}
                          <input 
                              type="number" 
                              value={amount} 
                              onChange={(e) => setAmount(e.target.value)} 
                              placeholder={`Enter ${modalType === 'income' ? 'income' : 'expense'} amount`} 
                              required 
                          />
                          <div className={styles.modalActions}>
                              <button type="submit" style={{ backgroundColor: "lightgreen" }}>Add</button>
                              <button type="button" style={{ backgroundColor: "red" }} onClick={handleCloseModal}>Cancel</button>
                          </div>
                      </form>
                  </div>
              </div>
          )}
      </div>
  );
};

export default Tracker;
