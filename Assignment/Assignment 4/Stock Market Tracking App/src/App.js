import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import StockContext from './context/StockContext';

function App() {
  const [stockSymbol, setStockSymbol] = useState("AAPL");

  return (
    <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
      <Dashboard />
    </StockContext.Provider>
  );
}

export default App;