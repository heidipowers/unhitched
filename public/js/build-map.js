'use strict'



function getThatMap() {

  console.log('loaded')

  const drawMap = function(points){
    const incidentMap = new google.maps.Map(document.getElementById('map_canvas'));
    const bounds = new google.maps.LatLngBounds()
    // Info Window Content

    const infoWindow = new google.maps.InfoWindow();

    points.forEach(function(point){
      //console.log(point)
      // Display multiple markers on a map
      const {incident_lat:lat,incident_lng:lng, incident_location:title} = point

      const infoWindowContent =
        '<div class="info_content">' +
        '<h3> Incident Type: '+ point.incident_type + '</h3>' +
        '<h3> Date of Incident: '+ point.incident_date + '</h3>' +
        '<h3> Horse Name: '+ point.horse_name + '</h3>' +
        '<p>' + point.incident_desc + '</p>' + '</div>';

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(Number.parseFloat(lat), Number.parseFloat(lng)),
        map: incidentMap,
        title: title
      });

      const id =  point.incident_id;
       // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, id) {

            return function() {
                infoWindow.setContent(infoWindowContent);
                infoWindow.open(incidentMap, marker);
            }
        })(marker,id));



      bounds.extend(marker.position)

    });//end forEach

    incidentMap.fitBounds(bounds)

    const boundsListener = google.maps.event.addListener((incidentMap), 'bounds_changed', function(event) {
        this.setZoom(13);
        google.maps.event.removeListener(boundsListener);
    });
  }



  $.get('/address')
    .then(drawMap)



}







  // $.ajax({
//           url: '/address',
//           type: 'get',
//           dataType: 'JSON',
//         })
//         .done(function(data) {
//           //console.log(data)
//           data.map(function(location, i){
//             console.log(location.incident_location, location.incident_lat, location.incident_lng)
//             let lat = parseFloat(location.incident_lat);
//             let lng = parseFloat(location.incident_lng);
//             let incidentLL = {lat: lat, lng: lng}
//             console.log(incidentLL)
//             let centerMap = {lat: 40.7828647, lng:-73.9675438}
//             var incidentMap = new google.maps.Map(document.getElementById('map'), {
//               zoom: 10,
//               center: centerMap
//             });

//             let marker = new google.maps.Marker({
//               position: incidentLL,
//               map: incidentMap,
//               title: location.incident_location
//             });

//             console.log(marker)

//           })
//           console.log("success");
//         })
//         .fail(function() {
//           console.log("error");
//         })
//         .always(function() {
//           console.log("complete");
//         });






