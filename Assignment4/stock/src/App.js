import React, { useState } from 'react';

const StockTracker = () => {
  const [symbol, setSymbol] = useState('AAPL'); // Initial stock symbol (you can change it)
  const [stockData, setStockData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockStockData = {
    meta: { symbol },
    values: [
      { open: 150, close: 155, high: 160, low: 145, volume: 1000000, timestamp: '2023-11-10T00:00:00Z' },
      // Add more mock data as needed
    ],
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const fetchStockData = () => {
    // Simulating an API call with a delay
    setIsLoading(true);
    setTimeout(() => {
      setStockData(mockStockData);
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchStockData();
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Stock Market Tracker</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Enter Stock Symbol:
          <input type="text" value={symbol} onChange={handleSymbolChange} style={{ margin: '10px' }} />
        </label>
        <button type="submit" style={{ margin: '10px' }}>
          Get Stock Data
        </button>
      </form>

      {isLoading && <p>Loading...</p>}

      {stockData && (
        <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
          <h2>{stockData.meta.symbol}</h2>
          <p>Open: {stockData.values[0].open}</p>
          <p>Close: {stockData.values[0].close}</p>
          {/* Add more relevant stock information as needed */}
        </div>
      )}
    </div>
  );
};

export default StockTracker;
