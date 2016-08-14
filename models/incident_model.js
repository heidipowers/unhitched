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
    let diedFalse = false;
    let diedTrue = true;
      if (req.body.fatal === 'false'){
        req.body.fatal = false;
      } else {
        req.body.fatal = true;
      }

        _db.one(`INSERT INTO incidents (incident_type, incident_month, incident_year, horse_name, incident_desc, incident_location, incident_lat, incident_lng, fatal)
               VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *;`,[req.body.type, req.body.month, req.body.year, req.body.name, req.body.description, req.body.location, Number.parseFloat(req.body.lat), Number.parseFloat(req.body.lng), req.body.fatal])
             .then(incident => {
              console.log("success!. incident = ", incident);
              res.newincident = incident;
              next();
             })
             .catch( error => {
              console.log('Error creating new entry', error);
              next();
             })
},

  updateIncident(req, res, next) {
    let diedFalse = false;
    let diedTrue = true;
      if (req.body.fatal === 'false'){
        req.body.fatal = false;
      } else {
        req.body.fatal = true;
      }
    _db.any(`UPDATE incidents
             SET
             incident_type=$1
             incident_month=$2,
             incident_year=$3,
             horse_name=$4,
             incident_desc=$5,
             incident_location=$6,
             incident_lat=$7,
             incident_lng=$8,
             fatal=$9
             WHERE movie_id=$10`, [req.body.type, req.body.month, req.body.year, req.body.name, req.body.description, req.body.location, Number.parseFloat(req.body.lat), Number.parseFloat(req.body.lng), req.body.fatal, req.params.id])
        .then(data => {
          console.log(data)
          next();
        })
        .catch(error => {
          console.log('editIncident error', error);
        })

  }



}
