import './App.css';
import './index.css'
import Dashboard from './components/Dashboard';
import React, { useState } from 'react';
import ThemeContext from './context/ThemeContext';
import StockContext from './context/StockContext';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("FB");
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
      <Navbar />
      <Home />
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

/*<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
      <Dashboard />
      </StockContext.Provider>
    </ThemeContext.Provider>*/