'use strict'

const request = require('request')
const KEY = process.env.GOOGLEMAPS_KEY

module.exports = {


    getMap(req, res, next) {

        const musicSearch = req.query.type
        const inputValue = req.query.value //new RegExp( '^' + req.query.value, 'i')
        const URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

        let qs = {
          'key': KEYx
        }

        if (musicSearch === 'artist') {
          qs.artist = inputValue;
        } else {
          qs.title = inputValue;
        }

        request.get({
              url: URL,
              qs: qs,
              headers: {
                'User-Agent': 'request'
              },
              json: true
            }, (err, response, data) => {
              if (err) throw err
              let mapMarkers = data
              res.results = mapMarkers.results
                //console.log(res.results)
                //console.log(URL)
              next()
            } //end function

          ) //end request.get

      }, //end showArtist


  } //module-exports
