import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ExpenseTrends = ({ expenses }) => {
  const chartData = expenses.map(expense => ({
    title: expense.title,
    amount: expense.amount
  }));

  return (
    <div style={{ marginTop: '20px' }}>
      <BarChart
        width={400}
        height={300}
        data={chartData}
        layout="vertical"
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="title" />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" name="Expense Amount" fill="#8884d8" />
      </BarChart>

    </div>
  );
};

export default ExpenseTrends;


