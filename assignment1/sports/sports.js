const apiUrl2='http://ergast.com/api/f1/2022/results/1.json';
const left=document.getElementById('left');
const right=document.getElementById('right');


let races = []; 
let index = 0;

left.addEventListener('click', function () {
    index = (index + 1 + races.length) % races.length;
    updateContent(races[index]);
});

right.addEventListener('click', function () {
    index = (index - 1 + races.length) % races.length;
    updateContent(races[index]);
});



fetch(apiUrl2)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('API Response:', data);
    races=data.MRData.RaceTable.Races;
    updateContent(races[index]);
    
    
 })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });



      
      function updateContent(race){
        document.getElementById('round-number').innerText=race.round;
        document.getElementById('grandprix-name').innerHTML=race.raceName;
        document.getElementById('circuit-name').innerText=race.Circuit.circuitName;
        document.getElementById('country').innerText=race.Circuit.Location.country;
        document.getElementById('city').innerText=race.Circuit.Location.locality;
        document.getElementById('date').innerText=race.date;
        document.getElementById('time').innerText=race.time;
        document.getElementById('grandprix-name2').innerText=race.raceName;
        document.getElementById('url').href=race.url;
        document.getElementById('winner').innerText=race.Results[0].Driver.givenName +' ' + race.Results[0].Driver.familyName;
        }




