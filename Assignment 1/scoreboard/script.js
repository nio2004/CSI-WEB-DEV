// Getting the DOM elements
var elapsedTime = document.querySelector("#elapsed");
var homeTeamImage = document.querySelector("#homeLogo");
var homeTeamName = document.querySelector("#homeName");
var awayTeamImage = document.querySelector("#awayLogo");
var awayTeamName = document.querySelector("#awayName");
var lastMatchGoal = document.querySelector("#goals");
var matchTable = document.querySelector("#matchTable");

// The function to create a match tile element
function addMatchTile(data) {
    // Creating the match tile div
    var matchTile = document.createElement('div');
    matchTile.classList.add("match-tile");

    // Creating the home team box
    var homeTeam = document.createElement('div');
    homeTeam.classList.add("team");
    
    // Creating the image and text for the home team
    var homeTileTeamName = document.createElement('p');
    homeTileTeamName.innerHTML = data['homeTeam']['name'];
    var homeTileTeamLogo = document.createElement('img');
    homeTileTeamLogo.src = data['homeTeam']['crestUrl'];
    
    homeTeam.appendChild(homeTileTeamLogo);
    homeTeam.appendChild(homeTileTeamName);

    // Creating the away team box
    var awayTeam = document.createElement('div');
    awayTeam.classList.add("team");
    
    // Creating the image and text for the away team
    var awayTileTeamName = document.createElement('p');
    awayTileTeamName.innerHTML = data['awayTeam']['name'];
    var awayTileTeamLogo = document.createElement('img');
    awayTileTeamLogo.src = data['awayTeam']['crestUrl'];
    
    awayTeam.appendChild(awayTileTeamLogo);
    awayTeam.appendChild(awayTileTeamName);

    // Creating the score
    var score = document.createElement('p');
    score.innerHTML = data['score']['fullTime']['homeTeam'] + " - " + data['score']['fullTime']['awayTeam'];

    // Appending all elements to the match tile
    matchTile.appendChild(homeTeam);
    matchTile.appendChild(score);
    matchTile.appendChild(awayTeam);

    matchTable.appendChild(matchTile);
}

// Fetching the data from football-data.org
fetch("https://api.football-data.org/v2/matches", {
    "method": "GET",
    "headers": {
        "X-Auth-Token": "4cd384abaf8e4e3b85826c186a7a237e"
    }
})
.then(response => response.json().then(data => {
    var matchesList = data['matches'];
    console.log(matchesList.length);

    // Now let's set the first match (assuming there's at least one match)
    if (matchesList.length > 0) {
        var match = matchesList[0];
        elapsedTime.innerHTML = match['status'];
        homeTeamImage.src = match['homeTeam']['crestUrl'];
        homeTeamName.innerHTML = match['homeTeam']['name'];
        awayTeamImage.src = match['awayTeam']['crestUrl'];
        awayTeamName.innerHTML = match['awayTeam']['name'];
        lastMatchGoal.innerHTML = match['score']['fullTime']['homeTeam'] + " - " + match['score']['fullTime']['awayTeam'];

        // Add match tiles for the remaining matches
        for (var i = 1; i < matchesList.length; i++) {
            addMatchTile(matchesList[i]);
        }
    }
}))
.catch(err => {
    console.log(err);
});
