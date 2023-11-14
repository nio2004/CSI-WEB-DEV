import React, { useState } from 'react';
import Navbar from './Navbar';
import { PlusIcon } from '@heroicons/react/24/solid'; 
import Dashcontent from './Dashboard-content';
import axios from 'axios';


const Sidebar = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  return (
    <>
      {/* Sidebar */}
      <div className="flex h-screen w-64 bg-black border-r">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800"></h1>
        </div>
        <nav className="p-4">
        <input type="file" onChange={handleFileChange} />
        <a onClick={handleUpload} className="block p-2 text-md rounded-md font-medium text-white hover:bg-white hover:text-black hover:rounded-md">
      <PlusIcon className="w-5 h-5 inline-block mr-2"  /> Upload File
    </a>
        </nav>
      </div>
      

      {/* Content */}
    
    </>
  );
};

export default Sidebar;

