import React, { useState, useEffect, useRef } from "react";
import './HeaderRight.css';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

function HeaderRight() {
  const [searchActive, setSearchActive] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    // 模拟后端取头像
    setAvatarUrl("/user_avatar.jpg");
  }, []);

  const handleAvatarClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const keyword = e.target.value;
      console.log("执行搜索: ", keyword);
      // 这里可以调用真正的搜索API
      setSearchActive(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setSearchActive(false), 100); 
    // 小延迟避免和菜单焦点冲突
  };

  return (
    <div className="header-right-container">
      {!searchActive && (
        <>
          <SearchIcon className="header-icon" onClick={() => setSearchActive(true)} />
          <Badge badgeContent={4} color="warning">
            <NotificationsIcon className="header-icon" />
          </Badge>
          <Avatar
            alt="User"
            src={avatarUrl}
            className="avatar"
            onClick={handleAvatarClick}
          />
          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>个人资料</MenuItem>
            <MenuItem onClick={handleMenuClose}>设置</MenuItem>
            <MenuItem onClick={handleMenuClose}>退出登录</MenuItem>
          </Menu>
        </>
      )}

      {searchActive && (
        <div className="search-container">
          <TextField
            inputRef={searchInputRef}
            onBlur={handleBlur}
            onKeyDown={handleSearchKeyDown}
            variant="outlined"
            size="small"
            placeholder="请输入搜索关键词..."
            autoFocus
            className="search-input"
          />
        </div>
      )}
    </div>
  );
}

export default HeaderRight;
