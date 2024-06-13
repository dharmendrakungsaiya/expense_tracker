import React from 'react';
import { BarChart,Bar, XAxis, YAxis, Legend } from 'recharts';
import styles from '../ExpenseTrends/Expense.module.css';

const processData = (data) => {
  const categoryTotals = data.reduce((acc, item) => {
    const amount = Number(item.amount) || 0;
    if (!acc[item.category]) {
      acc[item.category] = {
        category: item.category,
        total: 0,
      };
    }
    acc[item.category].total += amount;
    return acc;
  }, {});

  return Object.values(categoryTotals)
    .sort((a, b) => b.total - a.total)
    .map((cat) => ({ category: cat.category, total: cat.total }));
};

const ExpenseTrends = ({ expenses }) => {
  const chartData = processData(expenses);

  return (
    <div className={styles.chartContainer}>
      <BarChart
        width={300}
        height={300}
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        barSize={20}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="category"
          tick={{ fontSize: 10, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
        />
        
        <Legend />
        <Bar dataKey="total" name="Total Amount" fill="#8884d8" />
      </BarChart>
    </div>
  );
};




export default ExpenseTrends;
