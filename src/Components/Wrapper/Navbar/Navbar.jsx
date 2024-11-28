import React from 'react';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-user-info">
                <strong className="navbar-username">{localStorage.getItem('username')}</strong> | 
                <span className="navbar-role">{localStorage.getItem('role')}</span>
            </div>
            <button onClick={onLogout} className="navbar-logout-button">Logout</button>
        </nav>
    );
};

export default Navbar;
