import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './index.css';
import React, { useState, useContext } from 'react';
import ThemeContext from './context/ThemeContext';
import StockContext from './context/StockContext';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Dashboard from './components/Dashboard';

function App() {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  

  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});// Initialize stockSymbol with an empty string

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/stock/:stockSymbol"
          element={<Dashboard  />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
