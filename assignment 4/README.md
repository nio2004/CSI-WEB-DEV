# Assignment 4

## Requirements
The following requirements were laid out in the assignment:
1. Allow users to view real-time stock prices and charts
2. Setup React Router for handling different routes within the application
  2a. /: The home route that displays a list of stocks.
  2b. /stock/:symbol
3. A detailed view for each stock, showing the stock's current price and a historical price chart.
4. A search feature to allow users to filter and find specific stocks.
5. Responsive design for various screen sizes.

## Project Layout
This project handle requirements in the following way:
1. Homepage has a search bar. You need to enter a stock name in the search bar and press ENTER or click the search icon. The search bar reveals a list of best matches.
2. You can click one of these. The url for each match is set to '/stock/stockname'. Clicking one of these will take you to the detailed view of each stock.
3. The detailed view of each stock reveals:
  a. Most recent price fetched by the API
  b. Historical chart of the share price
  c. Stock name and ticker
  d. Country of Origin for the company of which the stock is shown
  e. Currency of the stock price
  f. Stock exchange where it is listed
  g. Date of IPO
4. You can further search for stocks in the detailed view as well.

## Dependencies/Libraries
Please go through package.json file and check for dependencies should you wish to fork this repository and run the application. Following are the packages installed using npm as extra other than the ones React comes pre-loaded with:
1. headlessui
2. heroicons
3. testing-library
4. autoprefixer
5. postcss
6. react-router-dom
7. recharts
8. tailwind-css
9. web-vitals

## API
This project uses the finnhub API for fetching stock data. ( https://finnhub.io/docs/api ). While it does return data from all stock exchanges around the world, US data seems to be the most updated. I recommend searching stocks listed on NASDAQ first.

## For cloning/forking
1. Navigate to root/stock-market-app
2. Use npm start
3. Clicking stock names from search bar might take time to respond and route you to the detailed stock view

## Layout
![image](https://github.com/nio2004/CSI-WEB-DEV/assets/123110966/98fa1b6c-172b-4a79-8894-e1db68df71fe)
![image](https://github.com/nio2004/CSI-WEB-DEV/assets/123110966/c2ebf836-47e8-46f9-b926-ee48cde2b8a7)
![image](https://github.com/nio2004/CSI-WEB-DEV/assets/123110966/4b600214-55d0-469e-adb7-09eef38f6636)





   

   
