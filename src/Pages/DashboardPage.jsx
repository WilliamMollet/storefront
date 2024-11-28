import React from 'react';
import UserManagement from '../Components/Dashboard/UserManagement';
import ProductManagement from '../Components/Dashboard/ProductManagement';

const DashboardPage = () => {
    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <UserManagement />
            <ProductManagement />
        </div>
    );
};

export default DashboardPage;
