// App.js
import React from 'react';
import Navbar from './components/navbar';
import Grid from './components/grid';
import './App.css' 

function App() {
  return (
    <div className='app-container'>
      <Navbar />
      <Grid />
    </div>
  );
}

export default App;
