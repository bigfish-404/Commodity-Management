// Sidebar.jsx

import React from "react";
import {
    Drawer,
    List,
    Toolbar,
    Typography,
    Collapse,

} from "@mui/material";
import {
    Home as HomeIcon,
    ShoppingCart as ShoppingCartIcon,
    History as HistoryIcon,
    Inventory as InventoryIcon,
    AddBox as AddBoxIcon,
    LocalMall as LocalMallIcon,
    LocalOffer as TagIcon,
    Category as CategoryIcon,
    Settings as SettingsIcon,
    CloudUpload as CloudUploadIcon,
    Print as PrintIcon,
    ExpandLess,
    ExpandMore,
} from "@mui/icons-material";

import SidebarItem from "./SidebarItem";
import { drawerStyles, titleStyles } from "./SidebarStyles";

function Sidebar() {
    const [openMaster, setOpenMaster] = React.useState(false);

    const handleToggleMaster = () => {
        setOpenMaster((prev) => !prev);
    };

    return (
        <Drawer variant="permanent" sx={drawerStyles}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={titleStyles}>
                    StockHub
                </Typography>
            </Toolbar>

            <List>
                <SidebarItem icon={<HomeIcon />} text="ホームページ" to="/api/homepage" />
                <SidebarItem icon={<ShoppingCartIcon />} text="販売登録" to="/api/saleInput" />
                <SidebarItem icon={<HistoryIcon />} text="販売履歴" to="/api/salesHistory" />
                <SidebarItem icon={<InventoryIcon />} text="商品リスト" to="/api/productList" />
                <SidebarItem icon={<AddBoxIcon />} text="商品追加" to="/api/productAdd" />

                {/* 折叠菜单：マスタ管理 */}
                <SidebarItem
                    icon={<SettingsIcon />}
                    text="マスタ管理"
                    to="#"
                    onClick={handleToggleMaster}
                    endIcon={openMaster ? <ExpandLess /> : <ExpandMore />}
                />


                <Collapse in={openMaster} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <SidebarItem icon={<TagIcon />} text="品番" to="/api/productInfo" inset />
                        <SidebarItem icon={<CategoryIcon />} text="カテゴリー" to="/api/category" inset />
                        <SidebarItem icon={<SettingsIcon />} text="規格・仕様" to="/api/specAdd" inset />
                        <SidebarItem icon={<LocalMallIcon />} text="販売チャネル" to="/api/channel" inset />
                    </List>
                </Collapse>

                <SidebarItem icon={<CloudUploadIcon />} text="商品インポート" to="/api/import" />
                <SidebarItem icon={<PrintIcon />} text="バーコード印刷" to="/api/print" />
            </List>
        </Drawer>
    );
}

export default Sidebar;
