var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "6babb60fbdbb8e4c937af2e6156b68ef"); // Replace with your API key
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// Replace 'Team1Name' and 'Team2Name' with the names of the teams you want to query
var team1Name = 'Manchester City';
var team2Name = 'Aston Villa';

// Make an API request to get the match score
fetch(`https://v3.football.api-sports.io/fixtures?team=${team1Name},${team2Name}`, requestOptions)
  .then(response => response.json())
  .then(data => {
    // Check if there are fixtures (matches) found
    if (data.response.length > 0) {
      const match = data.response[0];
      const team1Score = match.teams.home.score;
      const team2Score = match.teams.away.score;
      console.log(`${team1Name} ${team1Score} - ${team2Name} ${team2Score}`);
    } else {
      console.log(`No match found between ${team1Name} and ${team2Name}`);
    }
  })
  .catch(error => console.log('error', error));
