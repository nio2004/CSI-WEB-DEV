import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StockDetail = () => {
  const { symbol } = useParams();
  const [stockDetails, setStockDetails] = useState({});

  useEffect(() => {
    // Fetch detailed stock information based on the symbol
    const fetchStockDetails = async () => {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=AWM6XN4NG10JM1BY`);
        setStockDetails(response.data);
      } catch (error) {
        console.error(`Error fetching details for ${symbol}:`, error);
      }
    };

    fetchStockDetails();
  }, []);

  return (
    <div>
      <h2>{JSON.stringify(stockDetails)}</h2>
      
    </div>
  );
};

export default StockDetail;
