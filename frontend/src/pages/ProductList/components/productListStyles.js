// src/components/ProductListTable/productTableStyles.js

export const cellSx = {
  fontSize: 13,
  borderBottom: '1px solid #ccc',
  borderRight: '1px solid #ccc',
  padding: '6px 12px',
  textAlign: 'center',
};

export const rowSx = (index) => ({
  backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: '#e3f2fd',
    cursor: 'pointer',
  },
});
