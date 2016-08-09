'use strict';
const _db = require('./db') ;



module.exports = {

getAddresses(req, res, next) {
    console.log("get Addresses model")
    _db.any(`SELECT incident_location FROM incidents;`)
        .then( address=> {
          res.rows = address ;
          console.log(address);
          next()
        })
        .catch(error =>{
          console.log("You have an error getting getAddresses model", error);
          throw error;
        })
  }


}
