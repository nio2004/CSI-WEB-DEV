import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockPrice = () => {
  const [symbol, setSymbol] = useState('AAPL'); // Default symbol is Apple (AAPL)
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=98GRW7FLFZH2ER5S`
        );
        setPrice(response.data['Global Quote']['05. price']);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [symbol]);

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  return (
    <div>
      <h1>Stock Price Tracker</h1>
      <input type="text" value={symbol} onChange={handleSymbolChange} />
      <p>Symbol: {symbol}</p>
      <p>Price: {price ? `$${price}` : 'Loading...'}</p>
    </div>
  );
};

export default StockPrice;
