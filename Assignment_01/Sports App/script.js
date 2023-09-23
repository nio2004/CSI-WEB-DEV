const url = 'https://footapi7.p.rapidapi.com/api/matches/live';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2fb4734b6emshd5f0d1e4261c880p1e2dc1jsn7bb742bff15d',
        'X-RapidAPI-Host': 'footapi7.p.rapidapi.com',
    },
};

const maxMatchesToShow = 5; // Maximum number of matches to display

async function updateScoreboard() {
    try {
        const response = await fetch(url, options);

        // Check the response status code
        if (response.status === 429) {
            const scoreboard = document.getElementById('scoreboard');
            scoreboard.innerText = 'Exceeded the daily quota for Requests';
            return;
        }

        const data = await response.json();

        // Clear previous data
        const scoreboard = document.getElementById('scoreboard');
        scoreboard.innerHTML = '';

        // Display a maximum of `maxMatchesToShow` matches
        data.events.slice(0, maxMatchesToShow).forEach((match, index) => {
            const matchElement = document.createElement('div');
            matchElement.classList.add('match');
            matchElement.innerHTML = `
                <h2>${match.homeTeam.name} vs ${match.awayTeam.name}</h2>
                <p>Score: ${match.homeScore.current} - ${match.awayScore.current}</p>
                <p>Status: ${match.status.description}</p>
            `;
            scoreboard.appendChild(matchElement);
        });
    } catch (error) {
        console.error(error);
    }
}

// Initial update and refresh every 30 seconds
updateScoreboard();
setInterval(updateScoreboard, 30000);
