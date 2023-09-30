//getting the DOM elements
var elapsedTime = document.querySelector("#elapsed");
var homeTeamImage = document.querySelector("#homeLogo");
var homeTeamName = document.querySelector("#homeName");
var awayTeamImage = document.querySelector("#awayLogo");
var awayTeamName = document.querySelector("#awayName");
var lastMatchGoal = document.querySelector("#goals");
var matchTable = document.querySelector("#matchTable");


//the functions to create an element
function addMatchTile(data){
    //createing the tile div
    var matchtile = document.createElement('div');
    matchtile.classList.add("match-tile");

    //creating the home match box
    var homeTeam = document.createElement('div');
    homeTeam.classList.add("team");
    //creating the image and the text
    var homeTileTeamName = document.createElement('p');
    homeTileTeamName.innerHTML = data['teams']['home']['name'];
    var homeTileTeamLogo = document.createElement('img');
    homeTileTeamLogo.src=data['teams']['home']['logo'];
    homeTeam.appendChild(homeTileTeamLogo);
    homeTeam.appendChild(homeTileTeamName);

    var awayTeam = document.createElement('div');
    awayTeam.classList.add("team");
    //creating the image and the text
    var awayTileTeamName = document.createElement('p');
    awayTileTeamName.innerHTML = data['teams']['away']['name'];
    var awayTileTeamLogo = document.createElement('img');
    awayTileTeamLogo.src=data['teams']['away']['logo'];
    awayTeam.appendChild(awayTileTeamLogo);
    awayTeam.appendChild(awayTileTeamName);

    //createing the score
    var score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " - " + data['goals']['away'];

    //append all the element to the parent
    matchtile.appendChild(homeTeam);
    matchtile.appendChild(score);
    matchtile.appendChild(awayTeam);

    matchTable.appendChild(matchtile);
}
fetch("https://v3.football.api-sports.io/fixtures?live=all", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "197649cd6ed3c51daea57ef21e4227fa91a9b388bf8d28d504778a1035f2bb7b"
    }
})
.then(response => response.json().then(data => {
    var matchesList = data['response'];

    if (matchesList.length > 0) {
        var fixture = matchesList[0]['fixture'];
        var goals = matchesList[0]['goals'];
        var teams = matchesList[0]['teams'];
        console.log(matchesList.length);

        // Now let's set our first match
        if (fixture && teams && goals) {
            elapsedTime.innerHTML = fixture['status']['elapsed'] + "'";
            homeTeamImage.src = teams['home']['logo'];
            homeTeamName.innerHTML = teams['home']['name'];
            awayTeamImage.src = teams['away']['logo'];
            awayTeamName.innerHTML = teams['away']['name'];
            lastMatchGoal.innerHTML = goals['home'] + " - " + goals['away'];
        } else {
            console.error("Data structure is not as expected for the first match.");
        }

        for (var i = 1; i < matchesList.length; i++) {
            addMatchTile(matchesList[i]);
        }
    } else {
        console.error("No matches found in the response.");
    }
}))
.catch(err => {
    console.log(err);
});
