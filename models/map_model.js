'use strict'

const request = require('request')
const KEY = process.env.GOOGLEMAPS_KEY

module.exports = {

    getMap(req, res, next) {
      //go to location db page and pull the location intersections
      //console.log(res.location)



        const URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

        let qs = {
          'key': KEY
        }


        let address = []

        res.location.map(function(eachAddress, i){

             if(eachAddress.incident_location !== "Not Stated"){
             address.push(eachAddress.incident_location + ', NY');

              }//end if

              console.log(address)


        })//end map

        for(let i = 0; i < address.length; i++){

          qs.address = address[i];

          request.get({
              url: URL,
              qs: qs,
              json: true
            }, (err, response, data) => {
              if (err) throw err
              // res.results = data.results;

              data.results.map(function(address){
                res.results = address.geometry.location;
              })  //end map

                res.results = data;
                console.log(data)
       })//end request

        }//end for













      }, //end getMap


  } //module-exports
