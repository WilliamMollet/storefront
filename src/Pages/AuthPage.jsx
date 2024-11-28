import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Components/Auth/LoginForm';
import RegisterForm from '../Components/Auth/RegisterForm';

const AuthPage = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleSuccessfulLogin = (userData) => {
        onLogin(userData); // Passe les informations de l'utilisateur
        navigate('/dashboard');
    };

    return (
        <div className="auth-container">
            <h1>{isRegistering ? 'Register' : 'Login'}</h1>
            {isRegistering ? (
                <RegisterForm />
            ) : (
                <LoginForm onLogin={handleSuccessfulLogin} />
            )}
            <button onClick={() => setIsRegistering((prev) => !prev)}>
                {isRegistering ? 'Switch to Login' : 'Switch to Register'}
            </button>
        </div>
    );
};

export default AuthPage;
