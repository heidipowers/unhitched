'use strict'

function buildChart(){



            $.get('/incident', function(incidents) {
              /*optional stuff to do after success */
              //DATA RETURN FOR TYPE
              let traffic = 0;
              let park = 0;
              let collapse = 0;
              let total = incidents.length;
              let years = [];

              //GET DATA FOR VARIABLES
              incidents.forEach(function(incident){
                years.push(incident.incident_year);

                if (incident.incident_type === 'Traffic'){
                  traffic+=1;
                } else if (incident.incident_type === 'Collapse'){
                  collapse+=1;
                } else {
                  park+=1;
                }

              })//end forEach


               //Collect the number of incidents per year
              let yearsCollect = {};
              for(let i = 0; i< years.length; i++) {
                 //let count = years[i];
                 yearsCollect[years[i]] = yearsCollect[years[i]] ? yearsCollect[years[i]]+1 : 1;

              }

              let yearNum = [];
              let yearCount = [];

              for (var year in yearsCollect) {
                if (yearsCollect.hasOwnProperty(year)) {
                  yearNum.push(year);
                  yearCount.push(yearsCollect[year])
                }
              }


              //SET CHART VARIABLES
               const defaultLabel = ["Traffic Incidents", "Horse Collapses", "Incident Inside Central Park"];
               const defaultData = [traffic, collapse, park];
               const defaultType = 'bar';
               let data;
               let options;
               //Set Page Load Chart
               let graphLabels = defaultLabel;
               let graphData = defaultData;
               let type = defaultType;

               //GRAPH CHOICE

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
                                      "#FF6384",
                                      "#36A2EB",
                                      "#FFCE56"
                                  ],
                                  hoverBackgroundColor: [
                                      "#FF6384",
                                      "#36A2EB",
                                      "#FFCE56"
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
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "rgba(75,192,192,1)",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "rgba(75,192,192,1)",
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
              const ctx = document.getElementById("incidentChart");

              const incidentChart = new Chart(ctx, {
                type: type,
                data: data,
                options: options
              });//end chart

        });//end get


}//end buildmap

 const $userChoice = $('#chart-select');
 $userChoice.on('change', buildChart);

buildChart();



