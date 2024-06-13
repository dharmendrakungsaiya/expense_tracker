import React, { useState } from 'react';
import styles from '../ExpenseList/Expense.module.css';
import ExpenseTrends from '../ExpenseTrends/ExpenseTrends';
import LeftArrow from '../../leftarrow.png';
import RightArrow from '../../rightarrow.png';
import Rectangle from '../../Rectangle.png';



const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedExpense, setEditedExpense] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const categories = ["Food", "Entertainment", "Travel"];

  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const currentExpenses = expenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openEditModal = (expense) => {
    setEditedExpense(expense);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditedExpense(null);
  };

  const handleEdit = () => {
    onEdit(editedExpense);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className={styles.listsContainer}>
        <div>
          <div className={styles.expenseList}>
            {expenses.length === 0 ? (
              <p>No expenses added yet.</p>
            ) : (
              <ul>
                {currentExpenses.map((expense) => (
                  <li key={expense.id} className={styles.expenseItem}>
                    <div>
                      <div>{expense.title}</div>
                      <div className={styles.date}>
                        {new Date(expense.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className={styles.actions}>
                      <span className={styles.amount}>₹{expense.amount}</span>
                      <button onClick={() => openEditModal(expense)}>Edit</button>
                      <button onClick={() => onDelete(expense.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}


            {totalPages > 1 && (
              <div className={styles.pagination}>
                <img
                  src={LeftArrow}
                  alt="Left Arrow"
                  className={`${styles.arrow} ${styles.leftArrow}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                />
                <div className={styles.rectangleWrapper}>
                  <img src={Rectangle} alt="Rectangle" className={styles.rectangle} />
                  <span className={styles.pageNumber}>{currentPage}</span>
                </div>
                <img
                  src={RightArrow}
                  alt="Right Arrow"
                  className={`${styles.arrow} ${styles.rightArrow}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </div>
            )}

          </div>
        </div>
        <div className={styles.topExpenses}>
          <ExpenseTrends expenses={expenses} />
        </div>
      </div>

      {isEditModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Expense</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
              <input
                type="text"
                value={editedExpense.title}
                placeholder="Title"
                onChange={(e) => setEditedExpense({ ...editedExpense, title: e.target.value })}
              />
              <input
                type="number"
                value={editedExpense.amount}
                placeholder="Price"
                onChange={(e) => setEditedExpense({ ...editedExpense, amount: parseFloat(e.target.value) })}
              />
              <input
                type="text"
                list="categories"
                placeholder="Select category"
              />
              <datalist id="categories">
                {categories.map((category, index) => (
                  <option key={index} value={category} />
                ))}
              </datalist>

              <input
                type="date"
                value={editedExpense.date}
                onChange={(e) => setEditedExpense({ ...editedExpense, date: e.target.value })}
              />
              <div className={styles.modalActions}>
                <button type="submit" className={styles.expensesBtn}>Save</button>
                <button type="button" className={styles.cancel} onClick={closeEditModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};


export default ExpenseList;

