import React from 'react';
import Header from '../components/Header/Header';
import Sidebar, { SIDEBAR_WIDTH } from '../components/Sidebar/Sidebar';
import './MainLayout.css';

const MainLayout = ({ children }) => (
    <div className="main-layout">
        <Sidebar />
        <div className="right-wrapper" style={{ marginLeft: SIDEBAR_WIDTH }}>
            <Header />
            <div className="main-content">
                {children}
            </div>
        </div>
    </div>
);

export default MainLayout;
