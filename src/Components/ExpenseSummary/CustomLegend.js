import React from 'react';

const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, textAlign: 'center'}}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`} style={{ display: 'inline', margin: '0 10px', fontSize: '12px', color: 'white' }}>
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

export default CustomLegend;
