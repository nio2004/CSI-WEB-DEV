document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '2f8c4d513ba70ed6d80df27e38f642ae';
    const competitionId = 2; 
    const season = '2023';
  
    fetch(`https://v3.football.api-sports.io/fixtures?league=${competitionId}&season=${season}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    })
      .then(response => response.json())
      .then(data => {
        const scorecardContainer = document.getElementById('scorecard-container');
  
        data.response.forEach(match => {
          const scorecard = document.createElement('div');
          scorecard.className = 'scorecard';
  
          const datetime = new Date(match.fixture.timestamp * 1000).toLocaleString();
          const team1Name = match.teams.home.name;
          const team2Name = match.teams.away.name;
          const team1Score = match.goals.home;
          const team2Score = match.goals.away;
  
          scorecard.innerHTML = `
            <div class="datetime">${datetime}</div>
            <div class="logo-container">
              <img src="${match.teams.home.logo}" alt="">
              <img src="${match.teams.away.logo}" alt="">
            </div>
            <div class="team-container">
              <div class="team1">${team1Name}</div>
              <div class="team2">${team2Name}</div>
            </div>
            <div class="score-container">
              <div class="t1score">${team1Score}</div>
              <div class="t2score">${team2Score}</div>
            </div>
          `;
  
          // Append the scorecard to the container
          scorecardContainer.appendChild(scorecard);
        });
      })
      .catch(error => console.error('Error:', error));
  });
  