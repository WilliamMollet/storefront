import React, { useState } from 'react';
import api from '../../Utils/api';
import './LogRegForm.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user', // Valeur par défaut
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            setMessage('Registration successful! You can now log in.');
        } catch (error) {
            setMessage('Registration failed. Please try again.');
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Register</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="select-field"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="submit-button">Register</button>
            </form>
            {message && <p className="response-message">{message}</p>}
        </div>
    );
};

export default RegisterForm;
