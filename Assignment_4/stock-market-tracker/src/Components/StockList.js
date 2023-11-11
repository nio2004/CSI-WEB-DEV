import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const StockList = () => {
  
   return (
    <div>
      <h1>Stock Market Tracker</h1>
      <ul>
        <li> 
            <Link to="/stock/AAPL">Apple</Link>
        </li>
       
        <li> 
            <Link to="/stock/IBM">IBM</Link>
        </li>
        <li> 
            <Link to="/stock/MSFT">Microsoft</Link>
        </li>
        <li> 
            <Link to="/stock/GOOG">Google</Link>
        </li>
        <li> 
            <Link to="/stock/AMZN">Amazon</Link>
        </li>
        <li> 
            <Link to="/stock/TSLA">Tesla</Link>
        </li>
        <li> 
            <Link to="/stock/NVDA">NVIDIA</Link>
        </li>
        <li> 
            <Link to="/stock/JPM">JPMorgan Chase & Co.</Link>
        </li>
        <li> 
            <Link to="/stock/BAC">Bank of America Corporation</Link>
        </li>
        <li> 
            <Link to="/stock/META">Meta</Link>
        </li>
      </ul>
    </div>
  );
};

export default StockList;
