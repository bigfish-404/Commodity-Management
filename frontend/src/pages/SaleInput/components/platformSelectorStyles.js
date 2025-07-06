export const tabsBoxSx = {
  borderBottom: 1,
  borderColor: 'divider',
  mb: 2
};

export const tabSx = (selected) => ({
  fontWeight: selected ? 'bold' : 'normal',
  bgcolor: selected ? '#e3f2fd' : 'transparent',
  borderRadius: '8px',
  mx: 0.5,
  minHeight: 36,
  textTransform: 'none'
});
