'use strict'





function buildChart(incidents){

              let traffic = 0;
              let fatalities = 0;
              let park = 0;
              let collapse = 0;
              let total = incidents.length;
              let years = [];



              //GET DATA FOR VARIABLES
              incidents.forEach(function(incident){
                years.push(incident.incident_year);

                if ( incident.incident_type === 'Traffic'){
                  traffic+=1;
                } else if ( incident.incident_type === 'Collapse'){
                  collapse+=1;
                } else {
                  park+=1;
                }

                if ( incident.fatal ) {
                  fatalities+=1;
                }

              })//end forEach

               //Collect the number of incidents per year
              let yearsCollect = {};
              for(let i = 0; i< years.length; i++) {
                 //let count = years[i];
                 yearsCollect[years[i]] = yearsCollect[years[i]] ? yearsCollect[years[i]]+1 : 1;

              }

              //Make yearsCollect into 2 arrays
              let yearNum = [];
              let yearCount = [];

              for (var year in yearsCollect) {
                if (yearsCollect.hasOwnProperty(year)) {
                  yearNum.push(year);
                  yearCount.push(yearsCollect[year])
                }
              }


              //SET CHART VARIABLES
               const defaultLabel = ["Traffic Incidents", "Horse Collapses", "Incident Inside Central Park", "Horse Fatality"];
               const defaultData = [traffic, collapse, park, fatalities];
               const defaultType = 'bar';
               let data;
               let options = {
                              legend: {
                                  display: true,
                                  labels: {
                                      fontColor: 'rgb(48, 48, 48)',
                                      fontSize: 16
                                  }
                              }
                          }
               //Set Page Load Chart
               let graphLabels = defaultLabel;
               let graphData = defaultData;
               let type = defaultType;


               //GRAPH CHOICE
               //https://coolors.co
              let colorbright = "#EE6C4D";
              let colordark = "#D3D0CB";
              let colormed = "#6E8898";
              let colorlight = "#2E5266";

                 let graphInput = $userChoice.val();
                  if (graphInput === 'type'){

                      type = 'pie';
                      graphLabels = defaultLabel
                      graphData = defaultData

                      data = {
                          labels: graphLabels,
                          datasets: [
                              {
                                  data: graphData,
                                  backgroundColor: [
                                      colorlight,
                                      colorbright,
                                      colormed,
                                      colordark
                                  ],
                                  hoverBackgroundColor: [
                                      "#E2C044",
                                      "#373F51",
                                      "#A9BCD0",
                                      "#D8DBE2"
                                  ]
                              }]
                      };


                  } else {
                      type = 'line';

                      graphLabels = yearNum;
                      graphData = yearCount;


                      data =  {
                        labels: graphLabels,
                        datasets: [
                            {
                                label: "NYC Carriage Incidents by Year",
                                fill: true,
                                lineTension: 0.1,
                                backgroundColor: "#829399",
                                borderColor: "#545F66",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "#000",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: graphData,
                                spanGaps: false,
                            }
                        ]
                    };
                  }

              //BUILD CHART


              //DIV THAT HOLDS THE CANVAS
              const chartDiv = $('.chart');

              //EMPTY THE CHART DIV OF ANY CANVAS
              chartDiv.empty();

              //CREATE THE CANVAS AND APPEND TO THE CHART DIV
              const canvas = $('<canvas id="incidentChart">');
              chartDiv.append(canvas);

              //DECLARE CANVAS
              const chart = document.getElementById("incidentChart").getContext("2d");



                const incidentChart = new Chart(chart, {
                type: type,
                data: data,
                options: options
              });//end chart



}//end buildmap

//initial chartBuild on page load
//buildChart();
$.get('/incident')
  .then(buildChart)
//update Chart on userChoice
const $userChoice = $('#chart-select');
 $userChoice.on('change', function(){
    $.get('/incident')
      .then(buildChart)
 });











