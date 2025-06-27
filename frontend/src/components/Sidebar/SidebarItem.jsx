// SidebarItem.jsx
import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function SidebarItem({ icon, text, to = "#" }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ListItem
      button
      component={Link}
      to={to}
      sx={{
        marginX: '18px',
         marginY: '6px',
        // margin: 0,
        borderRadius: '6px',
        backgroundColor: isActive ? '#e8d3bd' : '#f7ede1',
        boxShadow: isActive
          ? 'inset 2px 2px 5px rgba(0,0,0,0.12), inset -2px -2px 5px rgba(255,255,255,0.6)'
          : '3px 3px 6px rgba(0,0,0,0.08)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: '#f0dfcc',
          boxShadow: '4px 4px 10px rgba(0,0,0,0.12)',
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: '36px', color: '#6e4f3a' }}>
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={text}
        sx={{
          color: '#5b4432',
          fontWeight: isActive ? 'bold' : 'normal',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      />
    </ListItem>
  );
}

export default SidebarItem;
