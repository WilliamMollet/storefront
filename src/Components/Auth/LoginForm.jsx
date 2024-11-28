import React, { useState } from 'react';
import api from '../../Utils/api';
import './LogRegForm.css';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', { email, password });
            console.log(data);
            localStorage.setItem('token', data.token); // Stocker le token
            localStorage.setItem('username', data.username); // Stocker les informations utilisateur
            localStorage.setItem('role', data.role); // Stocker le rôle utilisateur
            onLogin({ name: data.username, email: data.email }); // Passe les infos utilisateur
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
