// src/pages/ProductInfo/ProductInfoStyles.js
export const formContainerSx = {
  maxWidth: 1200,
  mx: 'auto',
  mt: 2,
  mb: 4,
  p: 4,
  bgcolor: '#fff',
  borderRadius: 4,
  boxShadow: 3
};

export const searchFieldSx = {
  width: 300,
};

export const tableContainerSx = {
  borderRadius: 2,
  boxShadow: 1,
};

export const tableSx = {
  minWidth: 800,
  borderCollapse: 'separate',
  borderSpacing: 0,
};

export const tableHeadRowSx = {
  backgroundColor: '#f4f6f8',
};

export const tableCellHeadSx = {
  fontWeight: 'bold',
  '&:not(:first-of-type)': {
    borderLeft: '1px solid #ddd',
  },
};

export const tableRowHoverSx = {
  '&:hover': {
    backgroundColor: '#f9f9f9',
  },
  borderBottom: '1px solid #eee',
};

export const tableCellBodySx = {
  borderLeft: '1px solid #eee',
};

export const disabledTextFieldSx = {
  backgroundColor: '#f5f5f5',
};
