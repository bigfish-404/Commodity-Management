// 单元格样式（带边框 + 居中 + 指定宽度）
export const cellSx = (width = 100) => ({
    border: '1px solid #ddd',
    textAlign: 'center',
    width: `${width}px`,
    padding: '6px 4px',
    fontSize: '14px'
});

// 输入框样式（透明背景 + 无边框 + 居中）
export const inputSx = {
    width: '80%',
    backgroundColor: 'transparent',
    '& .MuiOutlinedInput-root': {
        padding: 0,
    },
    '& .MuiInputBase-input': {
        textAlign: 'center',
        padding: '4px 0',
        fontSize: '14px'
    }
};

// 表格行样式（斑马纹 + 行高 + hover 高亮 + 选中高亮）
// salesInputTableStyles.js
export const rowSx = (index, isSelected) => ({
    backgroundColor: isSelected
        ? '#90caf9'
        : index % 2 === 0
            ? '#fafafa'
            : '#ffffff',
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: '#e3f2fd',
        cursor: 'pointer'
    }
});

// 分页栏外层容器
export const paginationContainerSx = {
  mt: 2,
  alignItems: 'center'
};

// 件数选择的 Select 框
export const selectBoxSx = {
  minWidth: 60,
  height: 32,
  fontSize: 13
};

// 当前显示范围 文字
export const itemRangeSx = {
  fontSize: 13,
  textAlign: 'center'
};

// 分页按钮
export const pageButtonSx = (isActive) => ({
  minWidth: 32,
  height: 32,
  p: 0,
  ml: 0.5,
  fontSize: 13,
  borderRadius: 1,
  fontWeight: 'bold',
  boxShadow: isActive ? 2 : 0
});

