import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/LoginForm';

const App = () => {
  const [token, setToken] = useState(null);


  const handleLogin = (userToken) => {
    setToken(userToken); 
  };

  const handleSignup = (userToken) => {
    setToken(userToken);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}>
          {token ? <Navigate to="/" /> : <LoginForm onLogin={handleLogin} />}
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
