import React from 'react';

const Navbar = ({ user, onLogout }) => {
    return (
        <nav className="navbar">
            <div>
                <strong>{localStorage.getItem('username')}</strong> | <span>{localStorage.getItem('role')}</span>
            </div>
            <button onClick={onLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
