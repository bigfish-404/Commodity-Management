// SidebarStyles.js

export const SIDEBAR_WIDTH = '15vw';

export const drawerStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
        width: SIDEBAR_WIDTH,
        minWidth: '160px',
        boxSizing: 'border-box',
        backgroundColor: '#f4e3d7',
        color: '#333',
        borderRight: '1px solid #e0cdb9',
    },
};

export const titleStyles = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    color: '#5a3d28',
    fontWeight: 'bold',
};
