
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styles from '../ExpenseSummary/Expense.module.css';
import CustomLegend from './CustomLegend';

function ExpenseSummary({ expenses }) {
  const data = expenses.reduce((acc, expense) => {
    const category = acc.find(cat => cat.name === expense.category);
    if (category) {
      category.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className={styles.chartContainer}>
    <PieChart width={199} height={199}>
      <Pie
        data={data}
        labelLine={false}
        cx="50%"
        cy="50%"
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend content={<CustomLegend />} layout="horizontal" verticalAlign="bottom" align="center" />
    </PieChart>
  </div>
  );
}

export default ExpenseSummary;

