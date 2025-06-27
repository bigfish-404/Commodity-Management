// Sidebar.jsx
import React from "react";
import { Drawer, List, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import TagIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PrintIcon from '@mui/icons-material/Print';

import SidebarItem from "./SidebarItem";
import './Sidebar.css';

export const SIDEBAR_WIDTH = '15vw';

function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
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
                    backgroundColor: '#f4e3d7', // 拟物底色
                    color: '#333',
                    borderRight: '1px solid #e0cdb9',
                },
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%',
                        color: '#5a3d28',
                        fontWeight: 'bold',
                    }}
                >
                    StockHub
                </Typography>
            </Toolbar>

            <List>
                <SidebarItem icon={<HomeIcon />} text="ホームページ" to="/api/homepage" />
                <SidebarItem icon={<ShoppingCartIcon />} text="販売登録" to="/api/saleInput" />
                <SidebarItem icon={<HistoryIcon />} text="販売履歴" to="/api/salesHistory" />
                <SidebarItem icon={<InventoryIcon />} text="商品リスト" to="/api/productList" />
                <SidebarItem icon={<AddBoxIcon />} text="商品追加" to="/api/productAdd" />
                <SidebarItem icon={<LocalMallIcon />} text="販売チャネル" to="/api/channel" />
                <SidebarItem icon={<TagIcon />} text="品番" to="/api/productInfo" />
                <SidebarItem icon={<CategoryIcon />} text="カテゴリー" to="/api/category" />
                <SidebarItem icon={<SettingsIcon />} text="規格・仕様" to="/api/spec" />
                <SidebarItem icon={<CloudUploadIcon />} text="商品インポート" to="/api/import" />
                <SidebarItem icon={<PrintIcon />} text="バーコード印刷" to="/api/print" />
            </List>
        </Drawer>
    );
}

export default Sidebar;
