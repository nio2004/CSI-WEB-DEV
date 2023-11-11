import React from 'react';
import LoginForm from '../Components/LoginForm';
import Navbar from '../Components/Navbar';

const Login = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the Login Page</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
