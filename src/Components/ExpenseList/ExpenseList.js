import React,{useState} from 'react';
import styles from '../ExpenseList/Expense.module.css';
import ExpenseTrends from '../ExpenseTrends/ExpenseTrends';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedExpense, setEditedExpense] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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
  };

  const handleEdit = () => {
    onEdit(editedExpense);
    setIsEditModalOpen(false);
  };

  return (
<>
<div className={styles.listsContainer}>
    {/* <div className={styles.recentTransactionsContainer}> */}
      
      
  

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
      </div>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`${styles.pageButton} ${
                currentPage === index + 1 ? styles.active : ''
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>


    {/* </div> */}
    {/* <div className={styles.topExpensesContainer}> */}
      
      <div className={styles.topExpenses}>
        <ExpenseTrends expenses={expenses} />
      </div>
    {/* </div> */}
  </div>


  {isEditModalOpen && (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit Expense</h2>
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
          value={editedExpense.category}
          placeholder="Select Category"
          onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
        />
        <input
          type="date"
          value={editedExpense.date}
          onChange={(e) => setEditedExpense({ ...editedExpense, date: e.target.value })}
        />
        <div className={styles.modalActions}>
          <button className={styles.expensesBtn} onClick={handleEdit}>Add Expense</button>
          <button className={styles.cancel} onClick={closeEditModal}>Cancel</button>
        </div>
      </div>
    </div>
  )}
</>


  );
};



export default ExpenseList;
