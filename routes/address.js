'use strict'

const dbModel = require('../models/db');

const addressModel = require('../models/address');
const addressRouter = require('express').Router();

addressRouter.get('/', (req, res) => {
  res.send('hello')
  //res.json(res.results);
})




module.exports = addressRouter;
