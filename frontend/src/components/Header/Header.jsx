// Header.jsx
import React from 'react';
import { Box, IconButton, Badge, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Header() {
    return (
        <Box
            sx={{
                width: '100%',
                height: '64px',
                backgroundImage: 'linear-gradient(135deg, #fdfcfa, #f3f1ed)', // ✅ 渐变背景
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingX: 3,
                boxShadow: 'inset 0 -2px 2px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.08)',
                zIndex: 1,
            }}
        >
            {/* 左侧空盒子占位，保持右侧图标居右 */}
            <Box sx={{ width: 100 }} />

            {/* 右侧图标组 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton>
                    <SearchIcon sx={{ color: '#5a3d28' }} />
                </IconButton>
                <IconButton>
                    <Badge
                        badgeContent={4}
                        componentsProps={{
                            badge: {
                                sx: {
                                    backgroundColor: '#c28f63',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    minWidth: '18px',
                                    height: '18px',
                                    borderRadius: '9px',
                                    boxShadow: '0 0 2px rgba(0,0,0,0.3)',
                                }
                            }
                        }}
                    >
                        <NotificationsIcon sx={{ color: '#5a3d28' }} />
                    </Badge>
                </IconButton>
                <IconButton>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#a88d72' }}>A</Avatar>
                </IconButton>
            </Box>
        </Box>
    );
}
