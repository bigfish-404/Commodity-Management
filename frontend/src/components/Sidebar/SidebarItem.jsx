import React from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon, text, to, selected }) => {
  // 定义一个SidebarItem组件，接收四个props：icon, text, to, selected
  return (
    <ListItem disablePadding>
      {/* 使用ListItem组件来创建一个列表项 */}
      <ListItemButton
        // 使用ListItemButton组件来创建一个可点击的按钮
        component={Link}
        // 使用Link组件来实现路由跳转
        to={to}
        selected={selected}
        sx={{
          '&:hover': {
            backgroundColor: '#FFB74D', // 鼠标悬停时的背景色
          }
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
