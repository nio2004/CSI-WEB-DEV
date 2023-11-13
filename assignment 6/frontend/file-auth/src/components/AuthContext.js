// AuthContext.js
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //const navigate = useNavigate();

  const login = async (username, password) => {
    try{
      const response = await axios.post('http://localhost:4000/login', {
        username, 
        password
      });

      const token = response.data.accesstoken;// spent 1 hr trying to fix this mf
      if (token) {
        setIsLoggedIn(true);}
      localStorage.setItem('token', token);
      return token;
      //navigate('/dashboard');

    }catch (error){
      console.error("Login failed", error);
      throw error;
    }

  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
