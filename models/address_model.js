'use strict';
const _db = require('./db') ;



module.exports = {
//go to database and return the incident location
getAddresses(req, res, next) {
    console.log("get Addresses model")
    _db.any(`SELECT *
             FROM incidents;`)
        .then( address=> {
          res.location = address;
          next()
        })
        .catch(error =>{
          console.log("You have an error getting getAddresses model", error);
          throw error;
        })
  }


}
