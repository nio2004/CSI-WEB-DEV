import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute