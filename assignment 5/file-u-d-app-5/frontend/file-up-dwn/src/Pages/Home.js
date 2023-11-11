import React from 'react'
import Navbar from '../Components/Navbar';
import FileUpload from '../Components/FileUpload';
import UserFiles from '../Components/UserFiles';

const Home = () => {
  return (
    <div>
      <Navbar />
      <FileUpload />
      <UserFiles />
      <h1>Home</h1>
    </div>
  )
}

export default Home;