// SidebarItem.jsx（最终修复，整体按钮缩进）

import React from "react";
import { ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function SidebarItem({ icon, text, to, inset = false, onClick, endIcon }) {
    const location = useLocation();
    const isActive = location.pathname === to;
    const isLink = typeof to === "string" && to !== "#";

    return (
        <ListItemButton
            component={isLink ? Link : "div"}
            to={isLink ? to : undefined}
            onClick={onClick}
            sx={{
                mmx: 1,                    // 让左右留点空白，避免贴边
                my: 0.5,
                pl: inset ? 3 : 2,        // 子项略向内缩
                borderRadius: '10px',
                justifyContent: 'space-between',
                pl: 2,
                // 关键点：整块按钮整体向右移动
                ml: inset ? 4 : 2,
                
                backgroundColor: isActive ? '#e0cdb9' : '#f9f1e6',
                boxShadow: isActive
                    ? 'inset 2px 2px 5px rgba(0,0,0,0.15), inset -2px -2px 5px rgba(255,255,255,0.6)'
                    : '3px 3px 6px rgba(0,0,0,0.08)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    backgroundColor: '#f0e0d0',
                    boxShadow: '4px 4px 10px rgba(0,0,0,0.12)',
                },
                cursor: 'pointer',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{ minWidth: 32, color: '#5a3d28' }}>
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                        fontSize: inset ? '0.9rem' : '1rem',
                        fontWeight: isActive ? 'bold' : 'normal',
                    }}
                    sx={{
                        color: '#5a3d28',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                />
            </Box>

            {endIcon && <Box sx={{ color: '#5a3d28', mr: 1 }}>{endIcon}</Box>}
        </ListItemButton>
    );
}

export default SidebarItem;
