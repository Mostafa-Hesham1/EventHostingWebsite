import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const userRole = localStorage.getItem('role');
    return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
