
function addData(){
    fetch("https://api.cricapi.com/v1/cricScore?apikey=0cfdb8db-3b55-4bf0-b053-b2682be26639")
	.then(result => result.json())
	.then(result => {
        
		result.data.forEach(element => {
            if(element.status!="Match not started")
            {
            const markup = `<div class="card border-3" style="width: 50rem; margin:20px; background:pink">
            <div class="card-body">
              <h5 class="card-title" style="text-align:center;">${element.t1} &nbsp VS &nbsp ${element.t2}</h5>
              <p class="card-text">
              <li>${element.t1}: ${element.t1s}</li>
              <li>${element.t2}: ${element.t2s}</li>
              <li>Status: ${element.status}</li>
              <li>Match Type: ${element.matchType}</li>
              </p>
              </div>
          </div>`;
           
            document.getElementById("content").insertAdjacentHTML("beforeend",markup)
            }
        });
	})
	.catch(err => {
		console.log("An error occured. Please check your code",err);
	});
}
addData()