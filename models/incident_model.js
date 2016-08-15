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

      let items = [
      {name: 'incident_type', val: req.body.type},
      {name: 'incident_month', val: req.body.month},
      {name: 'incident_year', val: req.body.year},
      {name: 'horse_name', val: req.body.name},
      {name: 'incident_desc', val: req.body.description},
      {name: 'incident_location', val: req.body.location},
      {name: 'incident_lat', val: req.body.lat},
      {name: 'incident_lng', val: req.body.lng },
      {name: 'fatal', val: req.body.fatal}
      ]
      let queryString = '';
      let vals = [];
      let currVal;
      let currI = 0;

      console.log(req.body, "this is the req body")
      console.log(req.params.id, "this is the params")

      for (let i=0; i<items.length; i++) {
        currVal = items[i].val;
        console.log('currVal = ', currVal);
        if (currVal !== undefined && currVal !== '') {
          if (queryString) {
            queryString += ", ";
          }
          currI += 1;
          queryString += `${items[i].name}=$${currI}`;
          vals.push(items[i].val);
        }
      }
      currI += 1;
      vals.push(req.params.id)
      console.log('queryString = ', queryString);
      console.log('vals = ', vals);
      _db.any(`UPDATE incidents SET ${queryString}
            WHERE incident_id=$${currI};`, vals)
      .then( data => {
        res.rows = data;
        console.log(data, 'data')
        console.log('Update successful!');
        next();
      })
      .catch( error => {
        console.log('Error ',error);
      });

  }



}//end



