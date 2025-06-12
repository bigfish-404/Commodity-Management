import React from "react";
import './Header.css';
import HeaderRight from './HeaderRight';

function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <h1 className="header-title">Commodity Management</h1>
                <HeaderRight />
            </div>
        </header>

    );
}

export default Header;
