export const boardPaperSx = {
  p: 3,
  borderRadius: 2,
  backgroundImage: `url("/assets/wood-bg.png")`, // 记得替换成你的实际路径
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: '1px solid #a67c52',
  boxShadow: '4px 6px 10px rgba(0,0,0,0.2)',
  transform: 'rotate(-0.3deg)',
};

export const nailSx = (position) => ({
  position: 'absolute',
  top: -8,
  [position]: '10%',
  width: 14,
  height: 14,
  backgroundColor: '#444',
  borderRadius: '50%',
  boxShadow: 'inset 0 1px 2px #000000aa',
  zIndex: 2,
});

export const titleColor = {
  color: '#5a3e24',
};

export const iconColor = {
  color: '#6b4c2c',
};

export const valueColor = {
  sales: '#8d5a2b',
  profit: '#b06e3a',
};
