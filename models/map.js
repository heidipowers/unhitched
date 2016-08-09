'use strict'

const request = require('request')
const KEY = process.env.GOOGLEMAPS_KEY

module.exports = {


    getMap(req, res, next) {

        const URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

        let qs = {
          'key': KEY
        }


          qs.address = 'Columbus Circle, NY'


        request.get({
              url: URL,
              qs: qs,
              json: true
            }, (err, response, data) => {
              if (err) throw err
              res.results = data.results;
              res.results.map(function(address){
                console.log(address.formatted_address)
              })

                //console.log(URL)
              next()
            } //end function

          ) //end request.get

      }, //end getMap


  } //module-exports
