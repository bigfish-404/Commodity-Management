import React from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import './MainLayout.css';

const MainLayout = ({ children }) => (
    <div className="main-layout">
        <Header />
        <div className="main-wrapper">
            <Sidebar />
            <div className="main-content">
                {children}
            </div>
        </div>
    </div>
);

export default MainLayout;
