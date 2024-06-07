import React, { useState } from 'react';

function AddIncomeForm({ addIncome }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(parseFloat(amount));
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Add Balance" required />
      <button type="submit">Add Income</button>
    </form>
  );
}

export default AddIncomeForm;
