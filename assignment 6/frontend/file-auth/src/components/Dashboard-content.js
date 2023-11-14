import React, { useState, useEffect } from 'react'
import Card from './Card'
import axios from 'axios';

const Dashcontent = () => {
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user_files', {
          withCredentials: true, // Include credentials (cookies) in the request
        });

        setUserFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching user files:', error);
      }
    };

    fetchUserFiles();
  }, []);
  return (
    <div>
      <h2>Your Files</h2>
      <ul>
        {userFiles.map((file) => (
          <li key={file._id}>{file.filename}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashcontent