import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StockDetail = () => {
  const { symbol } = useParams();
  const [stockDetails, setStockDetails] = useState({});
  let values
  useEffect(() => {
    // Fetch detailed stock information based on the symbol
    const fetchStockDetails = async () => {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=AWM6XN4NG10JM1BY`);
        await setStockDetails(response.data);
        values = stockDetails["Time Series (5min)"]
         console.log(values)
        console.log(stockDetails)
      } catch (error) {
        console.error(`Error fetching details for ${symbol}:`, error);
      }
    };

    fetchStockDetails();
  }, []);

  return (
    <div>
      
      <h1>{symbol}</h1>
      <h1>
        Open : {values["1. open"]}
        High : {values["2. high"]}
        Low : {values["3. low"]}
        Close : {values["4. close"]}
        Volume: {values["5. volume"]}
      </h1>
      
    </div>
  );
};

export default StockDetail;
