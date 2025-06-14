import React from 'react';

export default function ProductSelect({ name, value, handleChange, placeholder }) {
  return (
    <select name={name} value={value} onChange={handleChange}>
      <option value="">{`Choose ${placeholder}`}</option>
      <option value="Option1">{placeholder} 1</option>
      <option value="Option2">{placeholder} 2</option>
    </select>
  );
}
