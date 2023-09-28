# Live Scoreboard Web Application

This simple web application fetches live football match data from a specified API and displays it as a live scoreboard on a web page. It also handles the case where the daily quota for API requests is exceeded.

## Features

- Displays live scores for football matches.
- Handles API request quota exceeded scenario.
- Automatically updates scores every 30 seconds.

## Usage

1. Clone this repository to your local machine.
2. Open the `index.html` file in a web browser to view the live scoreboard.
3. Matches are displayed in a scrollable list with a maximum of 5 matches shown at a time to fit within the page.

## Configuration

To configure the API and update the code to fetch data from a different source, modify the `url` and `options` variables in the `script.js` file.

```javascript
const url = 'https://footapi7.p.rapidapi.com/api/matches/live';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'YOUR_API_KEY',
        'X-RapidAPI-Host': 'YOUR_API_HOST',
    },
};
