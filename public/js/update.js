function addIncident(event) {
  event.preventDefault();
  let $type = $('input[name="type"]').val();
  console.log($type, "type")
  let $month = $('input[name="month"]').val();
  console.log($month, "month");
  let $year = $('input[name="year"]').val();
  console.log($year, "year");
  let $horseName = $('input[name="horse-name"]').val();
  console.log($horseName, 'horseName');
  let $location = $('input[name="location"]').val();
  console.log($location, 'location');
  let $lat = $('input[name="lat"]').val();
  console.log($lat, 'lat');
  let $lng = $('input[name="lng"]').val();
  console.log($lng, 'lng');
  let $description = $('textArea[name="description"]').val();
  console.log($description, 'desc');
  let $fatal = $('input[name="fatal"]').val();
  console.log($fatal, 'fatal');




  // $.ajax({
  //   url: '/incident/update',
  //   type: 'POST',
  // })
  // .done(function() {
  //   console.log("success");
  // })
  // .fail(function() {
  //   console.log("error");
  // })
  // .always(function() {
  //   console.log("complete");
  // });

}



$(document).ready(function() {
  console.log('loaded on updates page')


  $("#update-btn").on('click', addIncident);
});
