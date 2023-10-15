import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css'
import Dashboard from './components/Dashboard';
import React, { useState } from 'react';
import ThemeContext from './context/ThemeContext';
import StockContext from './context/StockContext';
import Navbar from './components/Navbar';
import Home from './Pages/Home';


function App() {
  
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

/*<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
      <Dashboard />
      </StockContext.Provider>
    </ThemeContext.Provider>*/