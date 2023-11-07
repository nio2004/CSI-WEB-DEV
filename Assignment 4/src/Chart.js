import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Chart = () => {
  const [symbol, setSymbol] = useState('AAPL'); // Default symbol is Apple (AAPL)
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=YOUR_API_KEY`
        );
        const timeSeriesData = response.data['Time Series (Daily)'];
        const labels = Object.keys(timeSeriesData).reverse();
        const prices = labels.map((label) => timeSeriesData[label]['4. close']);
        setData({
          labels,
          datasets: [
            {
              label: `${symbol} Stock Price`,
              data: prices,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });
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
      <h1>Stock Price Chart</h1>
      <input type="text" value={symbol} onChange={handleSymbolChange} />
      {data && <Line data={data} />}
    </div>
  );
};

export default Chart;
