'use strict'

const dbModel = require('../models/db');

const addressModel = require('../models/address_model');
const addressRouter = require('express').Router();


//get list of addresses from DB

addressRouter.get('/', addressModel.getAddresses, (req, res) => {
  console.log(res.location, "OUTSIDE")
  res.json(res.location);
})




module.exports = addressRouter;
