import { useState } from 'react';
import './App.css';
import Dashboard from './components/dashboard';
import ThemeContext from './context/ThemeContext';
import StockContext from './context/StockContext';

function App() {
  const [stockSymbol, setStockSymbol]= useState("FB")
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value ={{darkMode , setDarkMode}}>
        <StockContext.Provider value ={{stockSymbol,setStockSymbol}}>
          <Dashboard></Dashboard>
        </StockContext.Provider>
        
    </ThemeContext.Provider>
    
  );
}

export default App;
