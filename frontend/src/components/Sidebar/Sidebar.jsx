// Sidebar.jsx
import React from "react";
import { Drawer, List, Toolbar, Typography } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PrintIcon from '@mui/icons-material/Print';
import SidebarItem from "./SidebarItem";
import './Sidebar.css';

const drawerWidth = 240;

function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                position: 'relative',
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    position: 'relative',
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#3B82F6',  
                    color: 'white'
                }
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">Action List</Typography>
            </Toolbar>
            <List>
                <SidebarItem icon={<CategoryIcon />} text="ホームページ" to={"/api/homepage"} />
                <SidebarItem icon={<Inventory2Icon />} text="販売登録" to="/api/saleInput" />
                <SidebarItem icon={<Inventory2Icon />} text="販売履歴" to="/api/salesHistory" />
                <SidebarItem icon={<CategoryIcon />} text="マイページ" to="/api/Mypage" />
                <SidebarItem icon={<SubtitlesIcon />} text="商品リスト"  to="/api/productList" />
                <SidebarItem icon={<SubtitlesIcon />} text="商品追加"  to="/api/productAdd"/>
                <SidebarItem icon={<SubtitlesIcon />} text="販売チャネル"  to="/api/channel"/>
                <SidebarItem icon={<SubtitlesIcon />} text="品番"  to="/api/productInfo"/>
                <SidebarItem icon={<BrandingWatermarkIcon />} text="カテゴリー" />
                <SidebarItem icon={<BrandingWatermarkIcon />} text="規格・仕様" />
                <SidebarItem icon={<UploadFileIcon />} text="Import Products" />
                <SidebarItem icon={<PrintIcon />} text="Print Barcode" />
            </List>
        </Drawer>
    );
}

export default Sidebar;
