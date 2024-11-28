import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

const Wrapper = ({ user, onLogout, children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // Met à jour l'état dans `App`
        navigate('/'); // Redirige vers la page de connexion
    };

    return (
        <div className="wrapper">
            <Navbar user={user} onLogout={handleLogout} />
            <main>{children}</main>
        </div>
    );
};

export default Wrapper;
