
export const titleSx = {
  mb: 4,
  fontWeight: 'bold',
  fontFamily: 'Roboto, "Noto Sans JP", sans-serif',
};

export const containerSx = {
  mx: 'auto',
  mt: 2,
  mb: 4,
  p: 4,
  bgcolor: '#fff',
  borderRadius: 4,
  boxShadow: 3
};

export const headerBoxSx = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 4,
};

export const paginationContainerSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mt: 4,
  flexWrap: 'wrap',
};

export const selectBoxSx = {
  minWidth: 80,
  height: 30,
  '& .MuiSelect-select': {
    paddingTop: '4px',
    paddingBottom: '4px',
    fontSize: '0.875rem',
  },
  '& .MuiOutlinedInput-input': {
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '8px',
    paddingRight: '24px',
  },
};

export const paginationButtonsBoxSx = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 0.5,
};

export const pageButtonSx = (active) => ({
  minWidth: 28,
  height: 28,
  fontSize: '0.75rem',
  borderRadius: 1,
  bgcolor: active ? 'primary.main' : 'grey.200',
  color: active ? 'white' : 'black',
  '&:hover': {
    bgcolor: active ? 'primary.dark' : 'grey.300',
  },
});

export const itemRangeSx = {
  textAlign: 'center',
  minWidth: 100,
  mx: 2,
  fontSize: '0.75rem',
};
