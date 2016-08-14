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

  createNewIncident(req, res, next) {
  console.log("creating new entry")
        _db.one(`INSERT INTO incidents (incident_type, incident_month, incident_year, horse_name, incident_desc, incident_location, incident_lat, incident_lng, fatal)
               VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *;`,[req.body.type, req.body.month, req.body.year, req.body.name, req.body.description, req.body.location, req.body.lat, req.body.lng, req.body.fata])
             .then(incident => {
              console.log("success!. incident = ", incident);
              res.newincident = incident;
              next();
             })
             .catch( error => {
              console.log('Error creating new entry', error);
              next();
             })
}


}
