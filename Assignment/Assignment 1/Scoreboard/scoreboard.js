var elapsedTime = document.querySelector("#elapsed");
var homeTeamLogo = document.querySelector("#homeLogo");
var homeTeamName = document.querySelector("#homeName");
var awayTeamLogo = document.querySelector("#awayLogo");
var awayTeamName = document.querySelector("#awayName");
var lastMatchGoals = document.querySelector("#goals");
var matchTable = document.querySelector("#matchTable");

fetch("https://v3.football.api-sports.io/fixtures?live=all", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "892da3aeb87d8d47744a27a7731d598e"
    }
})
.then((response) => response.json())
.then((data) => {
    generateTable(data);
})
.catch(err => {
    console.log(err);
});

function addMatchTile(data){
    var matchTile = document.createElement('div');
    matchTile.classList.add("match-tile");

    var homeTeam = document.createElement('div');
    homeTeam.classList.add("team");

    var homeTileLogo = document.createElement('img');
    var homeTileName = document.createElement('p');
    homeTileName.classList.add("team-name"); 
    homeTileLogo.src = data['teams']['home']['logo'];
    homeTileName.innerHTML = data['teams']['home']['name'];

    var awayTeam = document.createElement('div');
    awayTeam.classList.add("team");

    var awayTileLogo = document.createElement('img');
    var awayTileName = document.createElement('p');
    awayTileName.classList.add("team-name"); 
    awayTileLogo.src = data['teams']['away']['logo'];
    awayTileName.innerHTML = data['teams']['away']['name'];

    homeTeam.appendChild(homeTileLogo);
    homeTeam.appendChild(homeTileName);

    awayTeam.appendChild(awayTileLogo);
    awayTeam.appendChild(awayTileName);

    var score = document.createElement('p');
    score.classList.add("score");
    score.innerHTML = data['goals']['home'] + "  :  " + data['goals']['away'];

    matchTile.appendChild(homeTeam);
    matchTile.appendChild(score);
    matchTile.appendChild(awayTeam);

    matchTable.appendChild(matchTile);
}

function generateTable(data){
    console.log(data);

    var fixture = data.response[0].fixture;
    var teams = data.response[0].teams;
    var goals = data.response[0].goals;
    console.log(fixture);
    console.log(teams);
    console.log(goals);
    var size = data.results;
    console.log(size);

    elapsedTime.innerHTML = fixture['status']['elapsed'] + "'";
    homeTeamLogo.src = teams['home']['logo'];
    homeTeamName.innerHTML = teams['home']['name'];
    awayTeamLogo.src = teams['away']['logo'];
    awayTeamName.innerHTML = teams['away']['name'];
    lastMatchGoals.innerHTML = goals['home'] + "  :  " + goals['away'];

    for(i = 1; i < size; i++){
        addMatchTile(data.response[i]);
        var hr = document.createElement('hr');
        matchTable.appendChild(hr);
    }
}

