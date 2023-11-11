import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const ProtectedRoute = ({ element, ...props }) => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? (
        <Route {...props} element={element} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute