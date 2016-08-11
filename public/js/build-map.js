'use strict'

function getThatMap() {

  console.log('map loaded')



  const drawMap = function(points){
    // Create the map
    const mapOptions = {
        scrollwheel: false
    };
    const incidentMap = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    const bounds = new google.maps.LatLngBounds()

    // Create information Window
    const infoWindow = new google.maps.InfoWindow();

    points.forEach(function(point){

      // Display multiple markers on a map based on DB info
      const {incident_lat:lat,incident_lng:lng, incident_location:title} = point

      const infoWindowContent =
        '<div class="info_content">' +
        '<h3><span class="infostart">Incident Type:</span> '+ point.incident_type + '</h3>' +
        '<h3><span class="infostart">Date of Incident:</span> '+ point.incident_date + '</h3>' +
        '<h3><span class="infostart">Horse Name:</span> '+ point.horse_name + '</h3>' +
        '<p>' + point.incident_desc + '</p>' + '</div>';

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(Number.parseFloat(lat), Number.parseFloat(lng)),
        map: incidentMap,
        title: title
      });


      // Allow each marker to have an info window based on DB info
      const id =  point.incident_id;
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

    const boundsListener = google.maps.event.addListener((incidentMap), 'bounds_changed', function(event) {
        this.setZoom(13);
        google.maps.event.removeListener(boundsListener);
    });
  }


//Go get the data
  $.get('/address')
    .then(drawMap)

}








