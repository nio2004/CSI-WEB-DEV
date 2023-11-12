import React from 'react';
import './tailwind.css';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  return (
    <nav className="bg-[#B7CECE] p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-black font-bold text-xl">PDrive</div>
          <div className="text-black font-bold text-xl">Send Notes</div>
          <div className="flex space-x-4">
          <UserCircleIcon className="w-6 h-6 mr-2" />
            <a href="/login" className="text-black font-bold hover:text-blue-500">Login</a>
            <a href="/register" className="text-black font-bold hover:text-blue-500">Register</a>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-2 border-b-2 border-white"></div>
    </nav>
  );
};

export default Navbar;