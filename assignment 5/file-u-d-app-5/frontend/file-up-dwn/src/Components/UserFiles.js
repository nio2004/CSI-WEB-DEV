import React, { useState, useEffect } from 'react';

const UserFiles = () => {
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    const fetchUserFiles = async () => {
      try {
        // Replace with the actual URL of your server
        const response = await fetch('http://localhost:3000/userFiles', {
          method: 'GET',
          credentials: 'include', // Include cookies for session
        });

        if (response.ok) {
          const data = await response.json();
          setUserFiles(data.files);
        } else {
          console.error('Error fetching user files');
        }
      } catch (error) {
        console.error('Error fetching user files:', error);
      }
    };

    fetchUserFiles();
  }, []); // Run the effect only once on component mount

  return (
    <div>
      <h2>User Files</h2>
      <ul>
        {userFiles.map((file) => (
          <li key={file._id}>{file.filename}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserFiles;
