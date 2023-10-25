import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './pages/Homepage'; // Import your Homepage component
import Signup from './pages/Signup'; // Import your Signup component
import Login from './pages/Login'; // Import your Login component
import UserDashboard from './pages/UserDB';
import ProtectedRoute from './ProtectedRoutes';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Login />} />
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
