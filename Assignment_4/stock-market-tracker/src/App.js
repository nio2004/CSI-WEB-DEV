import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StockList from './Components/StockList';
import StockDetail from './Components/StockDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<StockList />} />
       
        <Route path="/stock/:symbol" element = {<StockDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
