'use strict'




function buildMap(userChoice){

const $userChoice = $('#chart-select');
$userChoice.on('change', function(){
  console.log('helo')
})


  $.get('/address', function(incidents) {
    /*optional stuff to do after success */

    let traffic = 0;
    let park = 0;
    let collapse = 0;
    let total = incidents.length;
    incidents.forEach(function(incident){
      if (incident.incident_type === 'Traffic'){
        traffic+=1;
      } else if (incident.incident_type === 'Collapse'){
        collapse+=1;
      } else {
        park+=1;
      }

    })//end forEach

    //BUILD CHART
    const ctx = document.getElementById("incidentChart");
    const incidentChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Collapse", "Traffic", "Park", "Total"],
        datasets: [{
            label: 'NYC Carriage Incidents',
            data: [collapse, traffic, park, total],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

  });//end get


}//end buildmap

buildMap();



