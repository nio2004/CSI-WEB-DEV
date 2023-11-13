import React from 'react';
import './tailwind.css';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, username, password } = useAuth();
  const navigate = useNavigate();


  const logout = () =>{
    setIsLoggedIn(false);
    axios.post('http://localhost:4000/logout', {
      username,
      password
    })
    console.log('logged out');
    navigate('/');
  }

  return (
    <nav className="bg-[#B7CECE] p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-black font-bold text-xl">PDrive</div>
          <div className="text-black font-bold text-xl">Send Notes</div>
          <div className="flex space-x-4">
            <UserCircleIcon className="w-6 h-6 mr-2" />
            {isLoggedIn ? (
              <a className="text-black font-bold hover:text-blue-500" onClick={logout}>
                Logout
              </a>
            ) : (
              <>
                <a href="/login" className="text-black font-bold hover:text-blue-500">
                  Login
                </a>
                <a href="/register" className="text-black font-bold hover:text-blue-500">
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container mx-auto p-2 border-b-2 border-white"></div>
    </nav>
  );
};

export default Navbar;
