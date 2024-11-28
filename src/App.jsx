import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './Pages/AuthPage';
import DashboardPage from './Pages/DashboardPage';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Wrapper from './Components/Wrapper/Wrapper';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage onLogin={handleLogin} />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Wrapper user={user} onLogout={handleLogout}>
                                <DashboardPage />
                            </Wrapper>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
