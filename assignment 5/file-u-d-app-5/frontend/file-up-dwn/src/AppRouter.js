import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import { AuthProvider } from './Contexts/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

const AppRouter = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute />} />
        {/* Add additional routes as needed */}
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default AppRouter;
