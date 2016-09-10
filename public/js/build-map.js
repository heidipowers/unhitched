'use strict'

function getThatMap() {

  var drawMap = function(points){
    // Create the map
    var mapOptions = {
        scrollwheel: false,
        //styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
        //https://snazzymaps.com
        styles: [
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e9e9e9"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dedede"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "saturation": 36
                        },
                        {
                            "color": "#333333"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                }
            ]
    };
    var incidentMap = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    var bounds = new google.maps.LatLngBounds()

    // Create information Window
    var infoWindow = new google.maps.InfoWindow();

    points.forEach(function(point){

      // Display multiple markers on a map based on DB info
      var {incident_lat:lat,incident_lng:lng, incident_location:title} = point

      var infoWindowContent =
        '<div class="info_content">' +
        '<h3><span class="infostart">Incident Type:</span> '+ point.incident_type + '</h3>' +
        '<h3><span class="infostart">Date of Incident:</span> '+ point.incident_month + " " + point.incident_year + '</h3>' +
        '<h3><span class="infostart">Location of Incident:</span> '+ point.incident_location + '</h3>' +
        '<h3><span class="infostart">Horse Name:</span> '+ point.horse_name + '</h3>' +
        '<p>' + point.incident_desc + '</p>' + '</div>';

        //Set the Marker
       var mapMarker;

       var blackMarker = {
            url: '../images/blackMarker.png',
            scaledSize: new google.maps.Size(20, 27),
        };

        var redMarker = {
            url: '../images/redMarker.png',
            scaledSize: new google.maps.Size(20, 27),
        };

            if (point.fatal){

              mapMarker = redMarker;

            } else {

              mapMarker = blackMarker;

            }


          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(Number.parseFloat(lat), Number.parseFloat(lng)),
            map: incidentMap,
            title: title,
            icon: mapMarker
          });




      // Allow each marker to have an info window based on DB info
      var id =  point.incident_id;
      google.maps.event.addListener(marker, 'click', (function(marker, id) {

            return function() {
                infoWindow.setContent(infoWindowContent);
                infoWindow.open(incidentMap, marker);
            }
        })(marker,id));



      bounds.extend(marker.position)

    });//end forEach


    //Readjust the map center and zoom
    incidentMap.fitBounds(bounds)

    var boundsListener = google.maps.event.addListener((incidentMap), 'bounds_changed', function(event) {
        this.setZoom(13);
        google.maps.event.removeListener(boundsListener);
    });
  }


//Go get the data
  $.get('/incident')
    .then(drawMap)
}








