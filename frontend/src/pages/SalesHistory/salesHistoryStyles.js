// 容器样式（页面整体布局）
export const containerSx = {
  mx: 'auto',
  mt: 2,
  mb: 4,
  p: 4,
  bgcolor: '#fff',
  borderRadius: 4,
  boxShadow: 3,
};

// 表头区域样式
export const headerBoxSx = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 4,
};

// 表格单元格样式（通用）
export function getCellStyle() {
  return {
    border: '1px solid #e0e0e0',
    fontSize: 13,
    whiteSpace: 'nowrap',
    textAlign: 'center',
    verticalAlign: 'middle',
  };
}

// 表格行样式（隔行变色 + hover 高亮）
export function getRowStyle(index) {
  return {
    backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa',
    '&:hover': {
      backgroundColor: '#e3f2fd',
    },
  };
}

// 分页按钮区域外框
export const paginationButtonsBoxSx = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 0.5,
};

// 单个分页按钮样式
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

// 当前件数范围显示样式
export const itemRangeSx = {
  textAlign: 'center',
  minWidth: 100,
  mx: 2,
  fontSize: '0.75rem',
};

// 件数选择框样式
export const selectBoxSx = {
  minWidth: 70,
  height: 32,
  fontSize: '0.8rem',
  backgroundColor: '#fff',
};

// 最外层分页容器 Grid 样式
export const paginationContainerSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mt: 4,
  flexWrap: 'wrap',
};
