'use strict';
const _db = require('./db') ;



module.exports = {
//go to database and return the incident location
getIncidents(req, res, next) {
    console.log("getIncidents model")
    _db.any(`SELECT *
             FROM incidents;`)
        .then( incident=> {
          res.incidents = incident;
          next()
        })
        .catch(error =>{
          console.log("You have an error getting getIncidents model", error);
          throw error;
        })
  },

  getWords(req, res, next) {
    _db.any(`SELECT incident_desc
              FROM incidents;`)
        .then(words => {
          res.words = words;
          next()
        })
        .catch(error => {
          console.log('you have a getWords error', error);
          throw error;
        })
  }


}
