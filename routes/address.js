'use strict'

const dbModel = require('../models/db');

const addressModel = require('../models/address');
const addressRouter = require('express').Router();

addressRouter.get('/', addressModel.getAddresses, (req, res) => {
  //res.send('hello')
  console.log(res.results, "OUTSIDE")
  res.json(res.results);
})




module.exports = addressRouter;
