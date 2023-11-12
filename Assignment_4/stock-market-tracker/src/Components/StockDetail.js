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
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=Amzn&interval=5min&apikey=AWM6XN4NG10JM1BY`);
        setStockDetails(response.data);
        // console.log(stockDetails["Time Series (5min)"])
        console.log(stockDetails)
      } catch (error) {
        console.error(`Error fetching details for ${symbol}:`, error);
      }
    };

    fetchStockDetails();
  }, []);

  return (
    <div>
      {/* <h2>{stockDetails["Time Series (5min)"]["2023-11-11 19:55:00"]["1. open"]}</h2> */}
      
    </div>
  );
};

export default StockDetail;
