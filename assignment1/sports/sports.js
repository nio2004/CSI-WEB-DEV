const apiUrl = 'https://ergast.com/api/f1/current.json';
const left=document.getElementById('left');
const right=document.getElementById('right');

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Process the data here
    console.log('API Response:', data);
    let races=data.MRData.RaceTable.Races;
    let index=0%races.length;
    
    if(races.length>0){
        var round=races[index].round;
        var grandPrixName=races[index].raceName;
        var circuitName=races[index].Circuit.circuitName;
        var country=races[index].Circuit.Location.country;
        var city=races[index].Circuit.Location.locality;
        var date=races[index].date;
        var time=races[index].time;
        var url=races[index].url
    }
    console.log(url);
    console.log(grandPrixName);
    document.getElementById('round-number').innerText=round;
    document.getElementById('grandprix-name').innerHTML=grandPrixName;
    document.getElementById('circuit-name').innerText=circuitName;
    document.getElementById('country').innerText=country;
    document.getElementById('city').innerText=city;
    document.getElementById('date').innerText=date;
    document.getElementById('time').innerText=time;
    document.getElementById('grandprix-name2').innerText=grandPrixName;
    document.getElementById('url').href=url;
    

  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });


  