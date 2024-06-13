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

    const categories = ["Food","Entertainment","Travel"];



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
                    // Handle edit logic here
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
            <div>
                <div className={styles.header}>
                    <div className={styles.wallet}>
                        <h3>Wallet Balance: {walletBalance}</h3>
                        <button
                            className={styles.btn1}
                            onClick={handleAddIncomeClick}
                        >
                            + Add Income
                        </button>
                    </div>
                    <div className={styles.wallet}>
                        <h3>Expenses: {expenses.reduce((total, expense) => total + expense.amount, 0)}</h3>
                        <button
                            className={styles.btn2}
                            onClick={handleAddExpensesClick}
                        >
                            + Add Expenses
                        </button>
                    </div>
                    <div>
                        <ExpenseSummary expenses={expenses} />
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Add {modalType === 'income' ? 'Income' : 'Expense'}</h2>
                        <form onSubmit={handleSubmit}>
                            {modalType === 'income' && (
                                <div className={styles.modalHeader}>
                                    <h3>Add Balance</h3>
                                </div>
                            )}
                            {modalType === 'expense' && (
                                <div className={styles.modalHeader}>
                                    <h3>Add Expenses</h3>
                                </div>
                            )}
                            {modalType === 'expense' && (
                                <>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Title"
                                    />
                                    <input
                                        type="text"
                                        list="categories"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        placeholder="Select category"
                                    />
                                    <datalist id="categories">
                                        {categories.map((category, index) => (
                                            <option key={index} value={category} />
                                        ))}
                                    </datalist>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </>
                            )}
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder={`${modalType === 'income' ? 'Income' : 'Expense'} amount`}
                            />
                            <div className={styles.modalActions}>
                                <button
                                    type="submit"
                                    className={modalType === 'income' ? styles.addIncomeButton : styles.addExpenseButton}
                                >
                                    {modalType === 'income' ? 'Add Balance' : 'Add Expense'}
                                </button>
                                <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Tracker;
