import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Details from './Details';
import Overview from './Overview';
import Chart from './Chart';
import ThemeContext from '../context/ThemeContext';
import StockContext from '../context/StockContext';
import { fetchQuote, fetchStockDetails } from '../api/stock-api';

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const navigate = useNavigate(); // Get the navigate function for navigation

  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className='col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center'>
        <Header name={stockDetails.name} />
      </div>
      <div className='md:col-span-2 row-span-4'>
        <Chart />
      </div>
      <div>
        <Overview
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails.currency}
        />
      </div>
      <div className='row-span-2 xl:row-span-3'>
        <Details details={stockDetails} />
      </div>
      <button
        onClick={() => navigate('/') /* Navigates back to the home page */}
        className='my-4 bg-blue-500 text-white px-4 py-2 rounded-md'
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default Dashboard;
