import React from 'react';
import Navbar from './Navbar';
import { PlusIcon } from '@heroicons/react/24/solid'; 
import Dashcontent from './Dashboard-content';

const Sidebar = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="flex h-screen w-64 bg-black border-r">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800"></h1>
        </div>
        <nav className="p-4">
        <a className="block p-2 text-md rounded-md font-medium text-white hover:bg-white hover:text-black hover:rounded-md">
      <PlusIcon className="w-5 h-5 inline-block mr-2" /> Upload File
    </a>
        </nav>
      </div>
      

      {/* Content */}
    
    </>
  );
};

export default Sidebar;
